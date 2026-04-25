"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { FormActionState } from "@/lib/form-state";
import {
  clearPortalSession,
  createPortalSession,
  isPortalConfigured,
  requirePortalAuth,
} from "@/lib/portal-auth";
import {
  createEventRecord,
  createTestimonialRecord,
  upsertNewsPost,
  upsertPerformanceRecord,
} from "@/lib/repositories/admin";

function getFieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDateInput(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date.");
  }

  return date.toISOString();
}

function splitBody(value: string) {
  return value
    .split(/\r?\n\r?\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function revalidatePublicContent(paths: string[] = []) {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/academics");
  revalidatePath("/community");
  revalidatePath("/api/feed");
  revalidatePath("/sitemap.xml");
  revalidatePath("/portal");

  for (const path of paths) {
    revalidatePath(path);
  }
}

const loginSchema = z.object({
  accessKey: z.string().trim().min(8, "Enter the portal access key."),
});

const newsSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters."),
  slug: z.string().trim().optional(),
  category: z.string().trim().min(3, "Category is required."),
  excerpt: z.string().trim().min(20, "Add a slightly longer excerpt."),
  publishedAt: z.string().trim().min(4, "Choose a publish date."),
  body: z.string().trim().min(40, "Add the article body."),
  featured: z.boolean(),
});

const eventSchema = z.object({
  title: z.string().trim().min(5, "Event title is required."),
  location: z.string().trim().min(3, "Location is required."),
  description: z.string().trim().min(20, "Add a fuller event description."),
  startDate: z.string().trim().min(4, "Choose the start date."),
  endDate: z.string().trim().optional(),
});

const testimonialSchema = z.object({
  title: z.string().trim().min(3, "Add a short title."),
  quote: z.string().trim().min(15, "Quote is too short."),
  audience: z.enum(["student", "parent", "alumni"]),
  isPublished: z.boolean(),
});

const performanceSchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  meanGrade: z.coerce.number().min(0).max(12),
  transitionRate: z.coerce.number().int().min(0).max(100),
  note: z.string().trim().optional(),
});

export async function loginPortalAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  if (!isPortalConfigured()) {
    return {
      status: "error",
      message:
        "Portal access is not configured yet. Add ADMIN_ACCESS_KEY to the environment first.",
    };
  }

  const parsed = loginSchema.safeParse({
    accessKey: formData.get("accessKey"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Enter the access key to continue.",
    };
  }

  const authenticated = await createPortalSession(parsed.data.accessKey);

  if (!authenticated) {
    return {
      status: "error",
      message: "That access key is not correct.",
    };
  }

  revalidatePath("/portal");
  redirect("/portal");
}

export async function logoutPortalAction() {
  await clearPortalSession();
  revalidatePath("/portal");
  redirect("/portal");
}

export async function publishNewsPostAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  try {
    await requirePortalAuth();
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Portal authentication required.",
    };
  }

  const parsed = newsSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    publishedAt: formData.get("publishedAt"),
    body: formData.get("body"),
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please review the news form fields.",
    };
  }

  try {
    const slug = slugify(parsed.data.slug || parsed.data.title);
    const body = splitBody(parsed.data.body);

    if (body.length === 0) {
      return {
        status: "error",
        message: "Add at least one article paragraph.",
      };
    }

    await upsertNewsPost({
      slug,
      title: parsed.data.title,
      category: parsed.data.category,
      excerpt: parsed.data.excerpt,
      body,
      publishedAt: normalizeDateInput(parsed.data.publishedAt),
      featured: parsed.data.featured,
    });

    revalidatePublicContent([`/news/${slug}`]);

    return {
      status: "success",
      message: "News story saved and pushed to the public site.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to save the news story.",
    };
  }
}

export async function createEventAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  try {
    await requirePortalAuth();
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Portal authentication required.",
    };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    location: formData.get("location"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please review the event fields.",
    };
  }

  try {
    await createEventRecord({
      title: parsed.data.title,
      location: parsed.data.location,
      description: parsed.data.description,
      startDate: normalizeDateInput(parsed.data.startDate),
      endDate: parsed.data.endDate
        ? normalizeDateInput(parsed.data.endDate)
        : undefined,
    });

    revalidatePublicContent();

    return {
      status: "success",
      message: "Event added and visible to the public schedule.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to create the event.",
    };
  }
}

export async function createTestimonialAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  try {
    await requirePortalAuth();
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Portal authentication required.",
    };
  }

  const parsed = testimonialSchema.safeParse({
    title: formData.get("title"),
    quote: formData.get("quote"),
    audience: formData.get("audience"),
    isPublished: formData.get("isPublished") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please review the testimonial fields.",
    };
  }

  try {
    await createTestimonialRecord(parsed.data);
    revalidatePublicContent();

    return {
      status: "success",
      message: "Testimonial saved and ready for community-facing pages.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to save the testimonial.",
    };
  }
}

export async function upsertPerformanceAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  try {
    await requirePortalAuth();
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Portal authentication required.",
    };
  }

  const parsed = performanceSchema.safeParse({
    year: formData.get("year"),
    meanGrade: formData.get("meanGrade"),
    transitionRate: formData.get("transitionRate"),
    note: formData.get("note") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please review the KCSE performance fields.",
    };
  }

  try {
    await upsertPerformanceRecord(parsed.data);
    revalidatePublicContent();

    return {
      status: "success",
      message: `KCSE performance for ${parsed.data.year} saved successfully.`,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to save the performance record.",
    };
  }
}

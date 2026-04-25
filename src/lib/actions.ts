"use server";

import { z } from "zod";

import {
  initialFormActionState,
  type FormActionState,
} from "@/lib/form-state";
import { saveInquiry } from "@/lib/repositories/inquiries";

export type ActionState = FormActionState;

export const initialActionState = initialFormActionState;

const phoneSchema = z
  .string()
  .trim()
  .min(9, "Enter a valid phone number.");

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please tell us your name."),
  phone: phoneSchema,
  topic: z.string().trim().min(2, "Choose the type of support you need."),
  preferredChannel: z
    .string()
    .trim()
    .min(2, "Tell us how you prefer to be contacted."),
  message: z.string().trim().min(10, "Add a short message so we can help."),
});

const admissionSchema = z.object({
  parentName: z.string().trim().min(2, "Parent or guardian name is required."),
  studentName: z.string().trim().min(2, "Student name is required."),
  phone: phoneSchema,
  currentGrade: z.string().trim().min(2, "Tell us the learner's current grade."),
  pathwayInterest: z
    .string()
    .trim()
    .min(2, "Select a pathway interest."),
  message: z
    .string()
    .trim()
    .min(10, "Share any special admission question or need."),
});

const alumniSchema = z.object({
  fullName: z.string().trim().min(2, "Your name is required."),
  graduationWindow: z
    .string()
    .trim()
    .min(2, "Tell us when you studied at St. Clare's."),
  phone: phoneSchema,
  supportType: z.string().trim().min(2, "Choose how you want to support."),
  message: z
    .string()
    .trim()
    .min(10, "Add a short note about your offer or interest."),
});

function getFieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

export async function submitContactAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    topic: formData.get("topic"),
    preferredChannel: formData.get("preferredChannel"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please review the highlighted fields.",
    };
  }

  await saveInquiry("contact", {
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    topic: parsed.data.topic,
    preferredChannel: parsed.data.preferredChannel,
    message: parsed.data.message,
  });

  return {
    status: "success",
    message:
      "Your message has been received. The school team can now follow up with you.",
  };
}

export async function submitAdmissionAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = admissionSchema.safeParse({
    parentName: formData.get("parentName"),
    studentName: formData.get("studentName"),
    phone: formData.get("phone"),
    currentGrade: formData.get("currentGrade"),
    pathwayInterest: formData.get("pathwayInterest"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please fill in the missing admission details.",
    };
  }

  await saveInquiry("admission", {
    fullName: parsed.data.parentName,
    phone: parsed.data.phone,
    topic: "Admissions",
    preferredChannel: "Phone or WhatsApp",
    message: parsed.data.message,
    metadata: {
      studentName: parsed.data.studentName,
      currentGrade: parsed.data.currentGrade,
      pathwayInterest: parsed.data.pathwayInterest,
    },
  });

  return {
    status: "success",
    message:
      "Admission interest captured. A parent-friendly next-step conversation can now happen.",
  };
}

export async function submitAlumniAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = alumniSchema.safeParse({
    fullName: formData.get("fullName"),
    graduationWindow: formData.get("graduationWindow"),
    phone: formData.get("phone"),
    supportType: formData.get("supportType"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: getFieldErrors(parsed.error),
      message: "Please complete the alumni mentorship form.",
    };
  }

  await saveInquiry("alumni", {
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    topic: parsed.data.supportType,
    preferredChannel: "Phone or WhatsApp",
    message: parsed.data.message,
    metadata: {
      graduationWindow: parsed.data.graduationWindow,
    },
  });

  return {
    status: "success",
    message:
      "Thank you for stepping forward. The mentorship and alumni desk now has your details.",
  };
}

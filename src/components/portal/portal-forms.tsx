"use client";

import { useActionState } from "react";

import { initialFormActionState } from "@/lib/form-state";
import {
  createEventAction,
  createTestimonialAction,
  loginPortalAction,
  publishNewsPostAction,
  upsertPerformanceAction,
} from "@/lib/portal-actions";
import { cn } from "@/lib/utils";

import { SubmitButton } from "@/components/forms/submit-button";

const inputClassName =
  "w-full rounded-2xl border border-brand-maroon/12 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-brand-maroon/40";

function ErrorText({ children }: { children?: string[] }) {
  if (!children?.[0]) {
    return null;
  }

  return <p className="text-sm text-brand-maroon-light">{children[0]}</p>;
}

function StatusMessage({
  status,
  message,
}: {
  status: "idle" | "success" | "error";
  message?: string;
}) {
  if (!message || status === "idle") {
    return null;
  }

  return (
    <p
      className={cn(
        "rounded-2xl px-4 py-3 text-sm",
        status === "success"
          ? "bg-brand-blush/65 text-brand-maroon"
          : "bg-brand-maroon-light/12 text-brand-maroon-light",
      )}
    >
      {message}
    </p>
  );
}

export function PortalLoginForm() {
  const [state, formAction] = useActionState(
    loginPortalAction,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Portal access key
        <input
          name="accessKey"
          type="password"
          className={inputClassName}
          placeholder="Enter access key"
        />
        <ErrorText>{state.errors?.accessKey}</ErrorText>
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Open portal" pendingLabel="Checking..." />
        <p className="text-sm text-muted">
          Use the local admin key stored in the environment.
        </p>
      </div>
      <StatusMessage status={state.status} message={state.message} />
    </form>
  );
}

export function PortalNewsForm() {
  const [state, formAction] = useActionState(
    publishNewsPostAction,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          News title
          <input name="title" className={inputClassName} placeholder="Title" />
          <ErrorText>{state.errors?.title}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Optional slug
          <input name="slug" className={inputClassName} placeholder="auto-from-title" />
          <ErrorText>{state.errors?.slug}</ErrorText>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Category
          <input name="category" className={inputClassName} placeholder="Academics" />
          <ErrorText>{state.errors?.category}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Publish date
          <input name="publishedAt" type="date" className={inputClassName} />
          <ErrorText>{state.errors?.publishedAt}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Excerpt
        <textarea
          name="excerpt"
          rows={3}
          className={cn(inputClassName, "resize-y")}
          placeholder="Short summary for cards and previews"
        />
        <ErrorText>{state.errors?.excerpt}</ErrorText>
      </label>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Story body
        <textarea
          name="body"
          rows={7}
          className={cn(inputClassName, "resize-y")}
          placeholder="Write paragraphs separated by blank lines"
        />
        <ErrorText>{state.errors?.body}</ErrorText>
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-brand-maroon/10 bg-brand-blush/20 px-4 py-3 text-sm font-medium text-brand-ink">
        <input name="featured" type="checkbox" className="h-4 w-4" />
        Mark as featured on the editorial side
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Save news story" pendingLabel="Saving..." />
        <p className="text-sm text-muted">
          Using an existing slug updates the same story instead of duplicating it.
        </p>
      </div>

      <StatusMessage status={state.status} message={state.message} />
    </form>
  );
}

export function PortalEventForm() {
  const [state, formAction] = useActionState(
    createEventAction,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Event title
          <input name="title" className={inputClassName} placeholder="Open day" />
          <ErrorText>{state.errors?.title}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Location
          <input name="location" className={inputClassName} placeholder="School hall" />
          <ErrorText>{state.errors?.location}</ErrorText>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Start date
          <input name="startDate" type="date" className={inputClassName} />
          <ErrorText>{state.errors?.startDate}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          End date
          <input name="endDate" type="date" className={inputClassName} />
          <ErrorText>{state.errors?.endDate}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Description
        <textarea
          name="description"
          rows={5}
          className={cn(inputClassName, "resize-y")}
          placeholder="Why the event matters to parents, students, or alumni"
        />
        <ErrorText>{state.errors?.description}</ErrorText>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Create event" pendingLabel="Saving..." />
        <p className="text-sm text-muted">Events feed the header and community schedule.</p>
      </div>

      <StatusMessage status={state.status} message={state.message} />
    </form>
  );
}

export function PortalTestimonialForm() {
  const [state, formAction] = useActionState(
    createTestimonialAction,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Title
          <input name="title" className={inputClassName} placeholder="Parent perspective" />
          <ErrorText>{state.errors?.title}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Audience
          <select name="audience" className={cn(inputClassName, "appearance-none")}>
            <option value="parent">Parent</option>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
          <ErrorText>{state.errors?.audience}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Quote
        <textarea
          name="quote"
          rows={4}
          className={cn(inputClassName, "resize-y")}
          placeholder="Short, trust-building quote"
        />
        <ErrorText>{state.errors?.quote}</ErrorText>
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-brand-maroon/10 bg-brand-blush/20 px-4 py-3 text-sm font-medium text-brand-ink">
        <input name="isPublished" type="checkbox" defaultChecked className="h-4 w-4" />
        Publish immediately
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Save testimonial" pendingLabel="Saving..." />
        <p className="text-sm text-muted">Published testimonials appear on public trust sections.</p>
      </div>

      <StatusMessage status={state.status} message={state.message} />
    </form>
  );
}

export function PortalPerformanceForm() {
  const [state, formAction] = useActionState(
    upsertPerformanceAction,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Year
          <input name="year" type="number" className={inputClassName} placeholder="2026" />
          <ErrorText>{state.errors?.year}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Mean grade
          <input
            name="meanGrade"
            type="number"
            step="0.1"
            className={inputClassName}
            placeholder="7.4"
          />
          <ErrorText>{state.errors?.meanGrade}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Transition rate
          <input
            name="transitionRate"
            type="number"
            className={inputClassName}
            placeholder="82"
          />
          <ErrorText>{state.errors?.transitionRate}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Note
        <textarea
          name="note"
          rows={3}
          className={cn(inputClassName, "resize-y")}
          placeholder="Optional context for the academic dashboard"
        />
        <ErrorText>{state.errors?.note}</ErrorText>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Save KCSE data" pendingLabel="Saving..." />
        <p className="text-sm text-muted">Saving an existing year updates that record.</p>
      </div>

      <StatusMessage status={state.status} message={state.message} />
    </form>
  );
}

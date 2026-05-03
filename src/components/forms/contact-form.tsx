"use client";

import { useActionState } from "react";

import {
  initialActionState,
  submitContactAction,
} from "@/lib/actions";
import { cn } from "@/lib/utils";

import { SubmitButton } from "./submit-button";

const inputClassName =
  "w-full rounded-2xl border border-brand-maroon/12 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-brand-maroon/40";

function ErrorText({ children }: { children?: string[] }) {
  if (!children?.[0]) {
    return null;
  }

  return <p className="text-sm text-brand-maroon-light">{children[0]}</p>;
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Full name
          <input name="fullName" className={inputClassName} placeholder="Parent or guardian name" />
          <ErrorText>{state.errors?.fullName}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Phone number
          <input name="phone" className={inputClassName} placeholder="07xx xxx xxx" />
          <ErrorText>{state.errors?.phone}</ErrorText>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Topic
          <select name="topic" className={cn(inputClassName, "appearance-none")}>
            <option value="">Choose one</option>
            <option value="Admissions">Admissions</option>
            <option value="Parent support">Parent support</option>
            <option value="School visit">School visit</option>
            <option value="General inquiry">General inquiry</option>
          </select>
          <ErrorText>{state.errors?.topic}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Preferred contact
          <select
            name="preferredChannel"
            className={cn(inputClassName, "appearance-none")}
          >
            <option value="">Choose one</option>
            <option value="Phone call">Phone call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Either is fine">Either is fine</option>
          </select>
          <ErrorText>{state.errors?.preferredChannel}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Message
        <textarea
          name="message"
          rows={5}
          className={cn(inputClassName, "resize-y")}
          placeholder="Tell the school what support you need."
        />
        <ErrorText>{state.errors?.message}</ErrorText>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Send message" pendingLabel="Sending..." />
        <p className="text-sm text-muted">
          Designed for quick completion, even on a simple phone.
        </p>
      </div>

      {state.message ? (
        <p
          className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            state.status === "success"
              ? "bg-brand-blush/65 text-brand-maroon"
              : "bg-brand-maroon-light/12 text-brand-maroon-light",
          )}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

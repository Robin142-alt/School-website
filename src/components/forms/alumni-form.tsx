"use client";

import { useActionState } from "react";

import {
  initialActionState,
  submitAlumniAction,
} from "@/lib/actions";
import { cn } from "@/lib/utils";

import { SubmitButton } from "./submit-button";

const inputClassName =
  "w-full rounded-2xl border border-brand-maroon/12 bg-white px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted/50 hover:border-brand-maroon/22 focus:border-brand-maroon focus:ring-3 focus:ring-brand-maroon/10";

function ErrorText({ children }: { children?: string[] }) {
  if (!children?.[0]) {
    return null;
  }

  return <p className="text-sm text-brand-maroon-light">{children[0]}</p>;
}

export function AlumniForm() {
  const [state, formAction] = useActionState(
    submitAlumniAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Full name
          <input name="fullName" className={inputClassName} placeholder="Your name" />
          <ErrorText>{state.errors?.fullName}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          When were you at school?
          <input
            name="graduationWindow"
            className={inputClassName}
            placeholder="Example: 2018-2021"
          />
          <ErrorText>{state.errors?.graduationWindow}</ErrorText>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Phone number
          <input name="phone" className={inputClassName} placeholder="07xx xxx xxx" />
          <ErrorText>{state.errors?.phone}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          How would you like to help?
          <select
            name="supportType"
            className={cn(inputClassName, "appearance-none")}
          >
            <option value="">Choose one</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Career talk">Career talk</option>
            <option value="Bursary support">Bursary support</option>
            <option value="Partnership">Partnership</option>
          </select>
          <ErrorText>{state.errors?.supportType}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Message
        <textarea
          name="message"
          rows={5}
          className={cn(inputClassName, "resize-y")}
          placeholder="Tell the school what support you can offer or explore."
        />
        <ErrorText>{state.errors?.message}</ErrorText>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Join alumni network" pendingLabel="Submitting..." />
        <p className="text-sm text-muted">A small action can open a bigger horizon for a girl.</p>
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

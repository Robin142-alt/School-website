"use client";

import { useActionState } from "react";

import {
  initialActionState,
  submitAdmissionAction,
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

export function AdmissionForm() {
  const [state, formAction] = useActionState(
    submitAdmissionAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Parent or guardian
          <input name="parentName" className={inputClassName} placeholder="Full name" />
          <ErrorText>{state.errors?.parentName}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink">
          Student name
          <input name="studentName" className={inputClassName} placeholder="Learner name" />
          <ErrorText>{state.errors?.studentName}</ErrorText>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm font-medium text-brand-ink sm:col-span-1">
          Phone
          <input name="phone" className={inputClassName} placeholder="07xx xxx xxx" />
          <ErrorText>{state.errors?.phone}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink sm:col-span-1">
          Current grade
          <select
            name="currentGrade"
            className={cn(inputClassName, "appearance-none")}
          >
            <option value="">Choose one</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Transfer student">Transfer student</option>
            <option value="Other">Other</option>
          </select>
          <ErrorText>{state.errors?.currentGrade}</ErrorText>
        </label>
        <label className="space-y-2 text-sm font-medium text-brand-ink sm:col-span-1">
          Pathway interest
          <select
            name="pathwayInterest"
            className={cn(inputClassName, "appearance-none")}
          >
            <option value="">Choose one</option>
            <option value="STEM">STEM</option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Arts & Sports">Arts & Sports</option>
            <option value="Need guidance first">Need guidance first</option>
          </select>
          <ErrorText>{state.errors?.pathwayInterest}</ErrorText>
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-brand-ink">
        Admission question or need
        <textarea
          name="message"
          rows={5}
          className={cn(inputClassName, "resize-y")}
          placeholder="Share anything the school should know before advising you."
        />
        <ErrorText>{state.errors?.message}</ErrorText>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Start admission" pendingLabel="Submitting..." />
        <p className="text-sm text-muted">The form is intentionally short for busy parents.</p>
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

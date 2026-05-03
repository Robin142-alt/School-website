"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
};

export function SubmitButton({ label, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-maroon px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-maroon/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-maroon/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {pending ? (
        <>
          <div className="spinner spinner-white" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}

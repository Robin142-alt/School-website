export type FormActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export const initialFormActionState: FormActionState = {
  status: "idle",
};

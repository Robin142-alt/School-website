import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return new URL(path, base).toString();
}

export function formatDate(date: string) {
  return format(new Date(date), "dd MMM yyyy");
}

export function formatMonthDay(date: string) {
  return format(new Date(date), "dd MMM");
}

export function formatDateRange(start: string, end?: string) {
  if (!end) {
    return format(new Date(start), "dd MMM yyyy");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (format(startDate, "MMM yyyy") === format(endDate, "MMM yyyy")) {
    return `${format(startDate, "dd")} - ${format(endDate, "dd MMM yyyy")}`;
  }

  return `${format(startDate, "dd MMM")} - ${format(endDate, "dd MMM yyyy")}`;
}

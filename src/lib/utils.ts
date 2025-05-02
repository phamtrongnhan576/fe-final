import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const formatDate = (date?: Date) => {
  if (!date) return "";
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
  });
};
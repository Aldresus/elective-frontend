import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function idInator(label: string) {
  return `${label.toLowerCase().replace(/\s+/g, "-")}-${Math.random().toString(36).substring(2, 15)}`;
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

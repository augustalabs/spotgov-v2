import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstName(name: string | undefined): string {
  if (!name) return "";
  return name.split(" ")[0];
}

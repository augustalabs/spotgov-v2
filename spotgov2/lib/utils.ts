import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getQueryClient } from "./react-query/client";
import { fetchUserOrganizations } from "@/features/organizations/actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | undefined): string {
  if (!name) return "";
  return name.split(" ")[0];
}

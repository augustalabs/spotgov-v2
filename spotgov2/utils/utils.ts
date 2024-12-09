import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | undefined): string {
  if (!name) return "";
  return name.split(" ")[0];
}

export function generateInviteToken(organizationId: string, email: string) {
  const payload = {
    organizationId,
    email,
  };

  // TODO: decide the expiry time
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET!, {
    expiresIn: "7d",
  });
}

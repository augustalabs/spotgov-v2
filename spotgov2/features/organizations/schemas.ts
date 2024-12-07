import * as z from "zod";
import { validatePortugalNif } from "./utils";

export const updateOrganizationSchema = z.object({
  name: z.string().min(3).max(255),
  nif: z
    .string()
    .or(z.null())
    .refine((arg) => validatePortugalNif(arg)),
});

export const inviteUserSchema = z.object({
  email: z.string().email({
    message: "O email fornecido não é válido.",
  }),
});

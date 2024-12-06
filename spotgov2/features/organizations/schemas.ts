import * as z from "zod";
import { validatePortugalNif } from "./utils";

export const updateOrganizationSchema = z.object({
  name: z.string().min(3).max(255),
  nif: z
    .string()
    .or(z.null())
    .refine((arg) => validatePortugalNif(arg)),
});

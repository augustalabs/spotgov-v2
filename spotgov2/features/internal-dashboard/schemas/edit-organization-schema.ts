import { z } from "zod";

export const editOrganizationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nif: z.string().min(1, "NIF is required"),
  deepDiveCurrency: z
    .number()
    .int()
    .nonnegative("Deep Dive Currency must be a non-negative integer"),
  matchmakingCurrency: z
    .number()
    .int()
    .nonnegative("Matchmaking Currency must be a non-negative integer"),
});

export type EditOrganizationSchema = z.infer<typeof editOrganizationSchema>;

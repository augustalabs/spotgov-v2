import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  // TODO: Refine password validation
  password: z.string().min(6, {
    message: "Password...",
  }),
});

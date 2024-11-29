import * as z from "zod";

export const AuthSchema = z.object({
  email: z.string().email(),
  // TODO: Refine password validation
  password: z.string().min(6),
});

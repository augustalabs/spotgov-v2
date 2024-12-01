import * as z from "zod";

// TODO: improve messages
const loginSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  // TODO: Refine password validation
  password: z.string().min(6, {
    message: "Password...",
  }),
});

export default loginSchema;

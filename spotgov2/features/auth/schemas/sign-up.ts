import * as z from "zod";

// TODO: improve messages
const signUpSchema = z
  .object({
    name: z.string().min(3, {
      message: "Nome inválido",
    }),
    email: z.string().email({
      message: "Email inválido",
    }),
    // TODO: Refine password validation
    password: z.string().min(6, {
      message: "Password...",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password...",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords não coincidem",
    path: ["passwordConfirmation"],
  });

export default signUpSchema;

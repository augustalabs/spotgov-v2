import * as z from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(3, {
      message: "O nome é inválido.",
    }),
    email: z.string().email({
      message: "O email é inválido.",
    }),
    password: z
      .string()
      .min(6, {
        message: "A password deve ter pelo menos 6 caracteres.",
      })
      .refine(
        (v) => v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
        {
          message:
            "A password deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
        }
      ),
    passwordConfirmation: z.string().min(6, {
      message: "A password deve ter pelo menos 6 caracteres.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As passwords não coincidem.",
    path: ["passwordConfirmation"],
  });

export default signUpSchema;

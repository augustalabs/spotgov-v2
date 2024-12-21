import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "O email é inválido",
  }),
  password: z
    .string()
    .min(6, {
      message: "A password deve ter pelo menos 6 caracteres.",
    })
    .refine(
      (v) => v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.,]{6,}$/),
      {
        message:
          "A password deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
      },
    ),
});

export default loginSchema;

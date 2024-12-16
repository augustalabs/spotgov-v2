import * as z from "zod";

const addLabelSchema = z.object({
  label: z
    .string()
    .min(1, {
      message: "A etiqueta deve ter pelo menos um caractere.",
    })
    .max(50, {
      message: "A etiqueta deve ter no máximo 50 caracteres.",
    }),
});

export default addLabelSchema;

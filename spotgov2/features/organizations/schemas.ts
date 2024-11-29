import * as z from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(3, {
    message: "O nome da organização deve ter no mínimo 3 caracteres",
  }),
  nif: z.string().length(9, {
    message: "O NIF é inválido",
  }),
});

import * as z from "zod";
import { FieldType } from "../types";

const addColumnSchema = z.object({
  fieldName: z
    .string()
    .min(1, {
      message: "O título da coluna é obrigatório.",
    })
    .max(50, {
      message: "O título da coluna é muito longo.",
    }),
  fieldType: z.nativeEnum(FieldType, {
    message: "O tipo de dados é inválido.",
  }),
});

export default addColumnSchema;

import * as z from "zod";
import { validatePortugalNif } from "../utils";

const updateOrganizationSchema = z.object({
  name: z.string().min(3).max(255),
  nif: z.string().refine((arg) => validatePortugalNif(arg)),
});

export default updateOrganizationSchema;

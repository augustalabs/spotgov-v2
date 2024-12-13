import * as z from "zod";

const inviteUserSchema = z.object({
  email: z.string().email({
    message: "O email fornecido não é válido.",
  }),
});

export default inviteUserSchema;

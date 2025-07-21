import { z } from "zod";

export const userSignInSchema = z.object({
  username: z.string().nonempty("O nome de usuário é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type userSignInType = z.infer<typeof userSignInSchema>;

import { userSignInSchema, userSignInType } from "@/interfaces/user/userSchema";
import api from "@/lib/axios";

export async function createToken(data: userSignInType) {
  const parsed = userSignInSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Dados inválidos para login");
  }

  const response = await api.post("/auth/user", parsed.data);

  return response.data;
}

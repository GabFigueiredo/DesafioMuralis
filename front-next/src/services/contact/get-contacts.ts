import {
  contactResponse,
  contactResponseSchema,
} from "@/interfaces/contact/contact-response-schema";
import api from "@/lib/axios";

export async function getContacts(): Promise<contactResponse[]> {
  const token = sessionStorage.getItem("Token");

  const response = await api.get("/contatos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const parsed = contactResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error("Erro de validação nos contatos");
  }

  return parsed.data;
}

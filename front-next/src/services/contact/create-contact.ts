import {
  contactRequest,
  singleContactRequestSchema,
} from "@/interfaces/contact/contato-request-schema";
import api from "@/lib/axios";

export async function createContact(
  data: contactRequest
): Promise<contactRequest> {
  const parsed = singleContactRequestSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Dados inválidos para criação de contacte");
  }

  const token = sessionStorage.getItem("Token");

  const response = await api.post("/contatos", parsed.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

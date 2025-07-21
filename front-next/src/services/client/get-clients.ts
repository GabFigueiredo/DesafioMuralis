import {
  clientResponse,
  clientResponseSchema,
} from "@/interfaces/client/client-response-schema";
import api from "@/lib/axios";

export async function getClients(): Promise<clientResponse[]> {
  const token = sessionStorage.getItem("Token");

  const response = await api.get("/cliente", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const parsed = clientResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error("Erro de validação nos clientes");
  }

  return parsed.data;
}

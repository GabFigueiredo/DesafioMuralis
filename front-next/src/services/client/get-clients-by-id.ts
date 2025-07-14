import {
  clientResponse,
  singleClientResponseSchema,
} from "@/interfaces/client/client-response-schema";
import api from "@/lib/axios";

export async function getClientsById(id: string): Promise<clientResponse> {
  const response = await api.get(`/cliente/${id}`);
  const parsed = singleClientResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error("Erro de validação nos clientes");
  }

  return parsed.data;
}

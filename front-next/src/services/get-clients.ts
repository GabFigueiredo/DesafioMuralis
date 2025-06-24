import {
  clientResponse,
  clientResponseSchema,
} from "@/interfaces/client-response-schema";
import api from "../lib/axios";

export async function getClients(): Promise<clientResponse[]> {
  const response = await api.get("/cliente");
  const parsed = clientResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new Error("Erro de validação nos clientes");
  }

  return parsed.data;
}

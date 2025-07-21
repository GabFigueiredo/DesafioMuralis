import { clientRequest } from "@/interfaces/client/cliente-request-schema";
import api from "@/lib/axios";

interface updateClientProps {
  id: string;
  dadosAtualizados: clientRequest;
}

export function updateClient({ id, dadosAtualizados }: updateClientProps) {
  const token = sessionStorage.getItem("Token");

  const response = api.put(`/cliente/${id}`, dadosAtualizados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

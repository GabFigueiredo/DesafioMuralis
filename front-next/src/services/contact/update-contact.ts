import { contactRequest } from "@/interfaces/contact/contato-request-schema";
import api from "@/lib/axios";

interface updateContactProps {
  id: string;
  dadosAtualizados: contactRequest;
}

export function updateContact({ id, dadosAtualizados }: updateContactProps) {
  const token = sessionStorage.getItem("Token");

  const response = api.put(`/contatos/${id}`, dadosAtualizados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

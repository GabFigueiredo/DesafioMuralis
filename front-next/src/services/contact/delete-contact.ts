import api from "@/lib/axios";

export async function deleteContact(id: string) {
  const response = api.delete(`/contatos/${id}`);

  return response;
}

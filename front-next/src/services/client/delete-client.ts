import api from "@/lib/axios";

export async function deleteClient(id: string) {
  const response = api.delete(`/cliente/${id}`);

  return response;
}

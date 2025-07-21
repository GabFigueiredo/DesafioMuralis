import api from "@/lib/axios";

export async function deleteClient(id: string) {
  const token = sessionStorage.getItem("Token");

  const response = api.delete(`/cliente/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

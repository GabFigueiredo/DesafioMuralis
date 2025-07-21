import api from "@/lib/axios";

export async function deleteContact(id: string) {
  const token = sessionStorage.getItem("Token");

  const response = api.delete(`/contatos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

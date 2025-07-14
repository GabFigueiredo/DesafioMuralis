import { getContactsById } from "@/services/client/get-contacts-by-id";
import { useQuery } from "@tanstack/react-query";

export function useGetContactsByClientIdQuery(client_id: string) {
  return useQuery({
    queryKey: ["cliente/" + client_id + "/contatos"],
    queryFn: () => getContactsById(client_id),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

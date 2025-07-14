import { getContacts } from "@/services/contact/get-contacts";
import { useQuery } from "@tanstack/react-query";

export function useContactsQuery() {
  return useQuery({
    queryKey: ["contatos"],
    queryFn: getContacts,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

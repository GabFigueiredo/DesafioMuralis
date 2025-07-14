import { getClients } from "@/services/client/get-clients";
import { useQuery } from "@tanstack/react-query";

export function useClientsQuery() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: getClients,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

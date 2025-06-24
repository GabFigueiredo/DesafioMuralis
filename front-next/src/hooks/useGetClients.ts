import { useQuery } from "@tanstack/react-query";
import { getClients } from "../services/get-clients";

export function useClientsQuery() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: getClients,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

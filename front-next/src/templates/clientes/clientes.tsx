"use client";

import { SearchBar } from "@/components/searchbar";
import { Table } from "@/components/table/table";
import { Skeleton } from "@/components/ui/skeleton";
import { clientResponse } from "@/interfaces/client-response-schema";
import { useClientsQuery } from "@/hooks/useGetClients";
import { useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export function ClientePage() {
  const queryClient = useQueryClient();

  const {
    data: clientes,
    error,
    isSuccess,
    isError,
    isFetchedAfterMount,
    status
  } = useClientsQuery();

  useEffect(() => {
    if (isSuccess && isFetchedAfterMount) {
      toast.success("Dados buscados com sucesso!");
      return;
    }

    if (isError && isFetchedAfterMount) {
      toast.error("Erro: " + error.message);
      return;
    }
  }, [isSuccess, isError, error, isFetchedAfterMount]);

  function handleRefresh() {
    queryClient.refetchQueries({
      queryKey: ["clientes"],
      type: "active",
    });
  }

  return (
    <main className="w-full flex flex-col p-16 gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <strong className="text-4xl font-bold">Clientes</strong>
          <RefreshCcw
            className="cursor-pointer"
            onClick={() => handleRefresh()}
          />
        </div>
      </div>
      <SearchBar />

      {status === "pending" ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[50px] w-full rounded-sm bg-zinc-300"
            />
          ))}
        </>
      ) : status === "error" ? (
        <div className="w-full flex justify-center items-center flex-col">
          <h2>Ocorreu um erro :/</h2>
          <p>{error.message}</p>
        </div>
      ) : (
        <Table<clientResponse>
          headers={["Nome", "CPF", "Data de nascimento", "Endereço"]}
          personas={clientes ?? []}
        />
      )}
    </main>
  );
}

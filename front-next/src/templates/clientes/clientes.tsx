"use client";

import { Table } from "@/components/table/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientsQuery } from "@/hooks/clients/useGetClients";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Paperclip } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ClientDetails } from "@/components/table/client-details";
import { clientResponse } from "@/interfaces/client/client-response-schema";
import { ClientHeader } from "@/components/client/client-header";
import { useFiltrarClientes } from "@/hooks/clients/useFilterClients";
import { SearchBar } from "@/components/client/searchbar";

export function ClientePage() {

  const {
    data: clientes,
    error,
    isFetchedAfterMount,
    status,
  } = useClientsQuery();

  useEffect(() => {
    if (status === "pending" ) {
      toast.loading("Carregando...");
    }
  
    if (status === "success" && isFetchedAfterMount) {
      toast.success("Clientes buscados com sucesso!");
    }
  
    if (status === "error" && isFetchedAfterMount) {
      toast.error("Erro ao buscar clientes: " + error.message);
    }

  }, [status, isFetchedAfterMount, error]);

  const clientesFiltrados = useFiltrarClientes(clientes);

  return (
    <main className="w-full flex flex-col p-16 gap-4">
      <ClientHeader />
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
        <Table>
          <Table.Header
            headers={[
              "ID",
              "Nome",
              "CPF",
              "Data de nascimento",
              "Endereço",
              "Detalhes",
            ]}
          />
          <Table.Body>
            {clientesFiltrados?.map((cliente) => (
              <ClienteDialogRow key={cliente.id} cliente={cliente} />
            ))}
          </Table.Body>
        </Table>
      )}
    </main>
  );
}

function ClienteDialogRow({ cliente }: { cliente: clientResponse }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table.Row>
        <Table.Td>{cliente.id}</Table.Td>
        <Table.Td>{cliente.nome}</Table.Td>
        <Table.Td>{cliente.cpf}</Table.Td>
        <Table.Td>{cliente.data_nascimento}</Table.Td>
        <Table.Td>{cliente.endereco}</Table.Td>
        <Table.Td>
          <DialogTrigger asChild>
            <button className="text-blue-500 hover:underline flex items-center gap-1">
              <Paperclip size={16} />
              Ver detalhes
            </button>
          </DialogTrigger>
        </Table.Td>
      </Table.Row>
        
        {isOpen && <ClientDetails cliente={cliente} />}
    </Dialog>
  );
}

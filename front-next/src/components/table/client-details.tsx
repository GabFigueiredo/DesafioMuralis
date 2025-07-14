import { clientResponse } from "@/interfaces/client/client-response-schema";
import { PersonaCard } from "./persona-card";
import { Table } from "./table";
import { useGetContactsByClientIdQuery } from "@/hooks/clients/useGetContactsByClientId";
import { toast } from "sonner";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ClientForm } from "../client/client-form";
import { useDeleteClient } from "@/hooks/clients/useDeleteClient";

interface ClientDetailsProps {
  cliente: clientResponse;
}

export function ClientDetails({ cliente }: ClientDetailsProps) {
  const {
    data: contatos,
    isSuccess,
    isFetchedAfterMount,
    error,
    status,
  } = useGetContactsByClientIdQuery(cliente.id);

  const { mutate: deleteClient } = useDeleteClient()

  useEffect(() => {
    if (isSuccess && isFetchedAfterMount) {
      toast.success("Contatos do cliente buscados com sucesso!");
    }
  }, [isSuccess, isFetchedAfterMount]);

  function handleDeleteClient() {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        deleteClient(cliente.id)
    }
  }

  return (
        <PersonaCard>
        <PersonaCard.Header>
            <PersonaCard.Title>{cliente.nome}</PersonaCard.Title>
            <PersonaCard.DeleteButton onClick={() => handleDeleteClient()}/>
            {/* Botão para editar cliente (Abre um modal) */}
            <Dialog>
                <DialogTrigger asChild>
                    <PersonaCard.EditButton />
                </DialogTrigger>
                <DialogContent className="p-0">
                    <ClientForm client={cliente}/>
                </DialogContent>
            </Dialog>
        </PersonaCard.Header>
            <PersonaCard.SubTitle>{cliente.cpf}</PersonaCard.SubTitle>

        <Table>
            <Table.Header headers={["Tipo", "Valor", "Observação"]} />
            <Table.Body>

            {status === "pending" ? (
                <Table.Row>
                    <Table.Td>
                        <Skeleton className="w-full h-7 bg-zinc-300" />
                    </Table.Td>
                    <Table.Td>
                        <Skeleton className="w-full h-7 bg-zinc-300" />
                    </Table.Td>
                    <Table.Td>
                        <Skeleton className="w-full h-7 bg-zinc-300" />
                    </Table.Td>
                </Table.Row> 
            ) : status === "error" ? (
                <Table.Row>
                    <Table.Td>
                        Ocorreu um erro :/
                    </Table.Td>
                    <Table.Td>
                        <p>{error.message}</p>
                    </Table.Td>
                </Table.Row> 
              ) : (
            contatos?.map((contato) => (
                <Table.Row key={contato.id}>
                    <Table.Td>{contato.tipo}</Table.Td>
                    <Table.Td>{contato.valor}</Table.Td>
                    <Table.Td>{contato.observacao}</Table.Td>
                </Table.Row>
            )))
            }
            </Table.Body>
        </Table>
        </PersonaCard>
  );
}


import { PersonaCard } from "./persona-card";
import { Table } from "./table";
import { toast } from "sonner";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { contactResponse } from "@/interfaces/contact/contact-response-schema";
import { ContactForm } from "../contact/contact-form";
import { useDeleteContact } from "@/hooks/contacts/useDeleteContact";
import { useGetClientById } from "@/hooks/clients/useGetClientsById";

interface ContactDetailsProps {
  contato: contactResponse;
}

export function ContactDetails({ contato }: ContactDetailsProps) {
  const {
    data: cliente,
    isSuccess: isFetchClientSuccess,
    isFetchedAfterMount,
    error,
    status,
  } = useGetClientById(contato.client_id);

  const { mutate: deleteContact } = useDeleteContact();
 
  useEffect(() => {
    if (isFetchClientSuccess && isFetchedAfterMount) {
      toast.success("Contatos do cliente buscados com sucesso!");
    }
    
  }, [isFetchClientSuccess, isFetchedAfterMount]);

  function handleDeleteContact() {
    if (confirm("Tem certeza que deseja excluir esse contato?")) {
        deleteContact(contato.id);
    }
  }

  return (
        <PersonaCard>
            <PersonaCard.Header>
                <PersonaCard.Title>{contato.valor}</PersonaCard.Title>
                <PersonaCard.DeleteButton onClick={() => handleDeleteContact()} />
                <Dialog>
                    <DialogTrigger asChild>
                        <PersonaCard.EditButton />
                    </DialogTrigger>
                    <DialogContent className="p-0">
                        <ContactForm Contact={contato}/>
                    </DialogContent>
                </Dialog>
            </PersonaCard.Header>
            <PersonaCard.SubTitle>{contato.observacao}</PersonaCard.SubTitle>

        <Table>
            <Table.Header headers={["Nome", "CPF", "Endereço"]} />
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
                <Table.Row key={cliente.id}>
                    <Table.Td>{cliente.nome}</Table.Td>
                    <Table.Td>{cliente.cpf}</Table.Td>
                    <Table.Td>{cliente.endereco}</Table.Td>
                </Table.Row>
                )
            }
            </Table.Body>
        </Table>
        </PersonaCard>
  );
}


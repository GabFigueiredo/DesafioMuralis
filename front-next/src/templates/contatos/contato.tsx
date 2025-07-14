'use client'

import { ContactHeader } from "@/components/contact/contact-header";
import { ContactDetails } from "@/components/table/contact-details";
import { Table } from "@/components/table/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useContactsQuery } from "@/hooks/contacts/useGetContacts";
import { contactResponse } from "@/interfaces/contact/contact-response-schema";
import { Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ContatoPage() {
    const {
        data: contatos,
        error,
        isFetchedAfterMount,
        status,
      } = useContactsQuery();
    
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
    
    return (
        <main className="w-full flex flex-col p-16 gap-4">
            <ContactHeader />

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
                          "Valor",
                          "Observação",
                          "Detalhes",
                        ]}
                      />
                      <Table.Body>
                        {contatos?.map((contato) => (
                            <ContatoDialogRow key={contato.id} contato={contato} />
                        ))}
                      </Table.Body>
                    </Table>
                  )}
        </main>
    )
}

function ContatoDialogRow({ contato }: { contato: contactResponse }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Table.Row>
          <Table.Td>{contato.id}</Table.Td>
          <Table.Td>{contato.valor}</Table.Td>
          <Table.Td>{contato.observacao}</Table.Td>
          <Table.Td>
            <DialogTrigger asChild>
              <button className="text-blue-500 hover:underline flex items-center gap-1">
                <Paperclip size={16} />
                Ver detalhes
              </button>
            </DialogTrigger>
          </Table.Td>
        </Table.Row>
          
          {isOpen && <ContactDetails contato={contato} />}
      </Dialog>
    );
  }
  
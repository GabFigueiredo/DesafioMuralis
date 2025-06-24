'use client';

import { PencilSimple, Trash, XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { EditClientModal } from "../EditClientModal";
import { Cliente } from "../../../../interfaces/Cliente";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import { useContactsByClientIdQuery } from "@/hooks/useGetContacts";

interface UserCardProps {
  persona: Cliente;
  setIsUserCardModalOpen: (isUserCardModalOpen: boolean) => void;
}

export function PersonaCard<T>({ persona, setIsUserCardModalOpen }: UserCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
      data: clientes,
      error,
      isSuccess,
      isError,
      isFetchedAfterMount,
      status
    } = useContactsByClientIdQuery(cliente);

  function handleDeleteClient(id: string) {

  }

  return (
    <DialogContent className="fixed top-1/2 left-1/2 min-w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white">
      <div className="bg-blue-600 rounded-t-md p-6 text-white">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{cliente.nome}</h2>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <PencilSimple size={24} className="cursor-pointer hover:text-orange-500" />
              </DialogTrigger>

              <EditClientModal
                setIsEditModalOpen={setIsEditModalOpen}
                cliente={cliente}
              />
            </Dialog>

            <button
              onClick={() => handleDeleteClient(cliente.id)}
              className="flex items-center justify-center bg-transparent border-0"
            >
              <Trash size={24} className="cursor-pointer hover:text-red-600" />
            </button>
          </div>

          <p className="text-[#BABABA] text-base">{cliente.cpf}</p>
        </header>
      </div>

      <DialogClose
        onClick={() => setIsUserCardModalOpen(false)}
        className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-white"
      >
        <XCircle size={30} />
      </DialogClose>


    </DialogContent>
  );
}

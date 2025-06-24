'use client'

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PersonaCard } from "./persona-card";

interface RowProps<T extends object> {
  persona: T;
}

export function Row<T extends object>({ persona }: RowProps<T>) {
  const [isUserCardModalOpen, setIsUserCardModalOpen] = useState(false);

  useEffect(() => {
    console.log(persona)
  }, [persona])

  return (
    <>
      <Dialog open={isUserCardModalOpen} onOpenChange={setIsUserCardModalOpen}>
        <DialogTrigger asChild>
          <tr
            className="bg-zinc-100 cursor-pointer hover:bg-[#EFEFEF]"
          >
            {Object.entries(persona).map(([chave, valor]) => (
              <td
                key={chave}
                className="text-base font-normal py-4 px-6 text-left first:rounded-bl-md last:rounded-br-md"
              >
                {String(valor)}
              </td>
            ))}
          </tr>
        </DialogTrigger>

        <PersonaCard cliente={persona} setIsUserCardModalOpen={setIsUserCardModalOpen} />
      </Dialog>
    </>
  );
}

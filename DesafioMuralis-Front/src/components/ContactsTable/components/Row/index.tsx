import { useState } from "react";
import { UserCard } from "../UserCard";
import {  ValueRow } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import { Contato } from "../../../../interfaces/Contato";

interface SingleRowProps {
    contato: Contato
 }

export function SingleRow({ contato }: SingleRowProps) {
    const [isUserCardModalOpen, setIsUserCardModalOpen] = useState(false)

    return (
        <Dialog.Root open={isUserCardModalOpen} onOpenChange={setIsUserCardModalOpen}>
            <Dialog.Trigger asChild>
                <ValueRow>
                    <td>{contato.id}</td>
                    <td>{contato.client_id}</td>
                    <td>{contato.tipo}</td>
                    <td>{contato.valor}</td>
                    <td>{contato.observacao}</td>
                </ValueRow>
            </Dialog.Trigger>

            <UserCard 
                contato={contato} 
                setIsUserCardModalOpen={setIsUserCardModalOpen}
            />
        </Dialog.Root>

    )
}
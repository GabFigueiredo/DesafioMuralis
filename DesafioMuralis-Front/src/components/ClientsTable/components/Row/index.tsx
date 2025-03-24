import { useState } from "react";
import { UserCard } from "../UserCard";
import {  ValueRow } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import { Cliente } from "../../../../interfaces/Cliente";
import { formatDateForFrontend } from "../../../../utils/formatter";

interface SingleRowProps {
    cliente: Cliente
 }

export function SingleRow({ cliente }: SingleRowProps) {
    const [isUserCardModalOpen, setIsUserCardModalOpen] = useState(false)

    return (
        <Dialog.Root open={isUserCardModalOpen} onOpenChange={setIsUserCardModalOpen}>
            <Dialog.Trigger asChild>
                <ValueRow >
                    <td>{cliente.id}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.nome}</td>
                    <td>{formatDateForFrontend(cliente.data_nascimento)}</td>
                    <td>{cliente.endereco}</td>
                </ValueRow>
            </Dialog.Trigger>

            <UserCard 
                cliente={cliente} 
                setIsUserCardModalOpen={setIsUserCardModalOpen}
            />
        </Dialog.Root>

    )
}
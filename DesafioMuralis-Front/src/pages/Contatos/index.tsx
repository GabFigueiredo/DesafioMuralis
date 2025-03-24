import { useContext, useState } from "react";
import { Button, MainContainer, TableContainer } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import { NewContactModal } from "../../components/NewContactModal";
import { UserCirclePlus } from "@phosphor-icons/react";
import { ContactsTable } from "../../components/ContactsTable";
import { ClientContext } from "../../contexts/ClientsContext";


export function Contatos() {
    const [isEditContactModal, setIsEditContactModal] = useState(false)

    const { state: { contatos } } = useContext(ClientContext)

    return (
        <MainContainer>
                <div>
                    <strong>Contatos</strong>
                    <Dialog.Root open={isEditContactModal} onOpenChange={setIsEditContactModal}>
                        <Dialog.Trigger asChild>
                        <Button>
                            <p>Criar</p>
                            <UserCirclePlus size={20}/>
                        </Button>
                        </Dialog.Trigger>
                        <NewContactModal setIsEditContactModal={setIsEditContactModal}/>
                    </Dialog.Root>
                </div>
                <TableContainer>
                    <ContactsTable contatos={contatos}/> 
                </TableContainer>
        </MainContainer>
)
}
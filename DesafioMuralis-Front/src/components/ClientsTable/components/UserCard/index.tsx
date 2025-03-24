import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, HeaderContent, Overlay, ScrollContainer, StyledDialogTitle, TableStyle, TBodyTable } from './styles'
import { PencilSimple, Trash, XCircle } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { ClientContext } from '../../../../contexts/ClientsContext'
import { EditClientModal } from '../EditClientModal'
import { Cliente } from '../../../../interfaces/Cliente'



interface UserCardProps {
    cliente: Cliente
    setIsUserCardModalOpen: (isUserCardModalOpen: boolean) => void;
}

export function UserCard({ cliente, setIsUserCardModalOpen }: UserCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { deleteClient, state: { contatos } } = useContext(ClientContext)

    function handleDeleteClient() {
        deleteClient(cliente.id)
        setIsUserCardModalOpen(false)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content aria-describedby={undefined}>
                <div>
                    <HeaderContent>
                        <div>
                            <StyledDialogTitle>{cliente.nome}</StyledDialogTitle>
                            <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                <Dialog.Trigger asChild>
                                    <PencilSimple size={24} />
                                </Dialog.Trigger>

                                <EditClientModal 
                                    setIsEditModalOpen={setIsEditModalOpen}
                                    cliente={cliente}
                                />

                            </Dialog.Root>
                            <button onClick={handleDeleteClient}>
                                <Trash size={24}/>
                            </button>
                        </div>
                        <p>{cliente.cpf}</p>
                    </HeaderContent>
                    <CloseButton>
                        <XCircle size={30}/>    
                    </CloseButton> 
                </div>
                <TableStyle>
                    <TBodyTable>
                        <ScrollContainer>
                            {contatos.map(contato => {
                                    if (contato.client_id === cliente.id) {
                                        return (
                                            <tr key={contato.id}>
                                                <td>{contato.id}</td>
                                                <td>{contato.tipo}</td>
                                                <td>{contato.valor}</td>
                                                <td>{contato.observacao}</td>
                                            </tr>
                                            )
                                    }
                                })}
                        </ScrollContainer>
                    </TBodyTable>
                </TableStyle>
            </Content>
        </Dialog.Portal>
)


}
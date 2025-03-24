import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, HeaderContent, Overlay, StyledDialogTitle, TableStyle, TBodyTable } from './styles'
import { PencilSimple, Trash, XCircle } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { ClientContext } from '../../../../contexts/ClientsContext'
import { EditContactModal } from '../EditContactModal'
import { formatDateForFrontend } from '../../../../utils/formatter'
import { Contato } from '../../../../interfaces/Contato'


interface UserCardProps {
    contato: Contato
    setIsUserCardModalOpen: (isUserCardModalOpen: boolean) => void;
}

export function UserCard({ contato, setIsUserCardModalOpen }: UserCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { deleteContact, state: { clientes } } = useContext(ClientContext)

    function handleDeleteClient() {
        deleteContact(contato.id)
        setIsUserCardModalOpen(false)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content aria-describedby={undefined}>
                <div>
                    <HeaderContent>
                        <div>
                            <StyledDialogTitle>ID do contato: {contato.id}</StyledDialogTitle>
                            <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                <Dialog.Trigger asChild>
                                    <PencilSimple size={24} />
                                </Dialog.Trigger>

                                <EditContactModal
                                    setIsEditModalOpen={setIsEditModalOpen}
                                    contato={contato}
                                /> 

                            </Dialog.Root>
                            <button onClick={handleDeleteClient}>
                                <Trash size={24}/>
                            </button>
                        </div>
                    </HeaderContent>
                    <CloseButton>
                        <XCircle size={30}/>    
                    </CloseButton> 
                </div>
                <TableStyle>
                    <TBodyTable>
                    {clientes.map(cliente => {
                            if (cliente.id === contato.client_id) {
                                return (
                                    <tr key={contato.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{formatDateForFrontend(cliente.data_nascimento)}</td>
                                    <td>{cliente.endereco}</td>
                                    </tr>
                                    )
                            }
                        })}
                    </TBodyTable>
                </TableStyle>
            </Content>
        </Dialog.Portal>
)


}
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useContext } from 'react'
// import { ClientContext } from '../../contexts/ClientsContext'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, RadioButton, RadioGroupController, RadioGroupRoot } from './styles'
import { XCircle } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { ClientContext } from '../../contexts/ClientsContext'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface NewContactModalProps {
    setIsEditContactModal: (isOpen: boolean) => void;
}


const NewContactSchema = z.object({
    client_id: z.number(),
    tipo: z.enum(['Email', 'Telefone']),
    valor: z.string(),
    observacao: z.string(),
})

type newContactFormInputs = z.infer<typeof NewContactSchema>

export function NewContactModal({setIsEditContactModal}: NewContactModalProps) {
    const { state: { clientes }, createNewContact } = useContext(ClientContext)
    const [isSnackbarOpen, setIsSnackBarOpen] = useState(false)


    const { register, reset, handleSubmit, control, watch } = useForm<newContactFormInputs>({
        resolver: zodResolver(NewContactSchema)
    })


    async function handleCreateNewContact(data: newContactFormInputs) {
        // Verifica se o novo contato tem um cliente existente
        const isNewContactValid = clientes.some(client => client.id === data.client_id);

        if (isNewContactValid) {
            createNewContact({
                id: 0,
                client_id: data.client_id,
                tipo: data.tipo,
                valor: data.valor,
                observacao: data.observacao
            })
        } else {
            setIsSnackBarOpen(true)
            return
        }

        setIsEditContactModal(false)
        reset()
    }

    function handleSnackBarClose() {
        setIsSnackBarOpen(false)
    }

    const typePlaceholder = watch("tipo")

    // Visibilidade do botão submit
    const client_id = watch("client_id")
    const valor = watch("valor")

    const isSubmitValid = !(valor && client_id);

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <div>
                    <Dialog.Title>Novo Contato</Dialog.Title>
                    <CloseButton>
                        <XCircle size={32}/>
                    </CloseButton> 
                </div>

                <form onSubmit={handleSubmit(handleCreateNewContact)}>
                    <input type='number'
                        placeholder='ID do cliente'
                        {...register("client_id", {valueAsNumber: true})}
                        required
                        >
                    </input>

                    <RadioGroupController>
                            <Controller
                                name="tipo"
                                control={control}
                                defaultValue='Email'
                                render={({ field }) => (
                                    <RadioGroupRoot {...field} onValueChange={field.onChange} value={field.value}>
                                        <RadioButton value='Email'>
                                            Email
                                        </RadioButton>
                                        <RadioButton value='Telefone'>
                                            Telefone
                                        </RadioButton>
                                        
                                    </RadioGroupRoot>
                                )}
                            />
                        <input
                            placeholder={typePlaceholder}
                            required
                            {...register("valor")}
                        />
                    </RadioGroupController>
                    <input
                        placeholder='Observação'
                        required
                        {...register("observacao")}
                    />
                    <button type='submit' disabled={isSubmitValid} >Cadastrar</button>
                </form>
            </Content>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackBarClose} // 3 segundos para fechar automaticamente
                >
                <Alert onClose={handleSnackBarClose} severity="warning">
                    Esse ID de cliente não existe no sistema
                </Alert>
            </Snackbar>

        </Dialog.Portal>
    )
}
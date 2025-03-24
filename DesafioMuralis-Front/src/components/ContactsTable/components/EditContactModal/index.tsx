import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useContext } from 'react'
// import { ClientContext } from '../../contexts/ClientsContext'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, RadioButton, RadioGroupController, RadioGroupRoot } from './styles'
import { XCircle } from '@phosphor-icons/react'
import { useContext } from 'react'
import { ClientContext } from '../../../../contexts/ClientsContext'
import { Contato } from '../../../../interfaces/Contato'


interface NewContactModalProps {
    setIsEditModalOpen: (isOpen: boolean) => void;
    contato: Contato
}

const EditContactSchema = z.object({
    tipo: z.enum(['Email', 'Telefone']),
    valor: z.string(),
    observacao: z.string(),
})

type eidtContactFormInputs = z.infer<typeof EditContactSchema>

export function EditContactModal({ setIsEditModalOpen, contato}: NewContactModalProps) {
    const { editContact } = useContext(ClientContext)


    const { register, reset, handleSubmit, control, watch } = useForm<eidtContactFormInputs>({
        resolver: zodResolver(EditContactSchema)
    })


    async function handleEditContact(data: eidtContactFormInputs) {
        const updatedClient = {...contato, ...data}
        editContact(contato.id, updatedClient)
        setIsEditModalOpen(false)
        reset()
    }

    const typePlaceholder = watch("tipo")

    // Visibilidade do botão submit
    const valor = watch("valor")

    const isSubmitValid = !(valor);

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <div>
                    <Dialog.Title>Editar contato</Dialog.Title>
                    <CloseButton>
                        <XCircle size={32}/>
                    </CloseButton> 
                </div>

                <form onSubmit={handleSubmit(handleEditContact)}>
                    <RadioGroupController>
                            <Controller
                                name="tipo"
                                control={control}
                                defaultValue={contato.tipo}
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
                            defaultValue={contato.valor}
                            {...register("valor")}
                        />
                    </RadioGroupController>
                    <input
                        placeholder='Observação'
                        required
                        defaultValue={contato.observacao}
                        {...register("observacao")}
                    />
                    <button type='submit' disabled={isSubmitValid} >Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}
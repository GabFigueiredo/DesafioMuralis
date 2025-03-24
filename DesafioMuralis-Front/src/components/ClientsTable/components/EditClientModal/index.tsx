import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay } from './styles'
import { XCircle } from '@phosphor-icons/react'
import { useContext } from 'react'
import { ClientContext } from '../../../../contexts/ClientsContext'
import { Cliente } from '../../../../interfaces/Cliente'
import Cleave from 'cleave.js/react'

interface EditClientModalProps {
    cliente: Cliente
    setIsEditModalOpen: (isEditModalOpen: boolean) => void;
}

const NewClientSchema = z.object({
    nome: z.string(),
    cpf: z.string(),
    data_nascimento: z.string(),
    endereco: z.string(),
})

type newClientFormInputs = z.infer<typeof NewClientSchema>

export function EditClientModal({ cliente, setIsEditModalOpen }: EditClientModalProps) {
    const { editClient } = useContext(ClientContext)

    const { register, handleSubmit, watch, control } = useForm<newClientFormInputs>({
        resolver: zodResolver(NewClientSchema),
    })

    function handleEditClient(data: newClientFormInputs) {

        const updatedClient = {...cliente, ...data}
        editClient(cliente.id, updatedClient)
        setIsEditModalOpen(false)
    }

    // Visibilidade do Botão Submit
    const nome = watch("nome");
    const cpf = watch("cpf")
    
    const isSubmitValid = !(nome && cpf?.length === 14);

    return (
            <Dialog.Portal>
                <Overlay />
                <Content aria-describedby="transaction-description">
                    <div>
                        <Dialog.Title>Editar Cliente</Dialog.Title>
                        <CloseButton>
                            <XCircle size={30}/>    
                        </CloseButton> 
                    </div>
                    <form onSubmit={handleSubmit(handleEditClient)}>
                        <input
                            placeholder='Nome'
                            required
                            defaultValue={cliente.nome}
                            {...register("nome")}
                        />
                        <Controller
                                name="cpf"
                                control={control}
                                defaultValue={cliente.cpf}
                                rules={{
                                    required: "CPF é obrigatório",
                                    validate: (value) => value.length == 14 || "CPF inválido"
                                }}
                                render={({ field }) => (
                                    <Cleave
                                        {...field}
                                        placeholder="CPF"
                                        options={{
                                            blocks: [3, 3, 3, 2], 
                                            delimiters: ['.', '.', '-'], 
                                            numericOnly: true
                                        }}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            field.onBlur();
                                        }}
                                        
                                    />
                                )}
                            />
                        <input
                            placeholder='Endereço'
                            defaultValue={cliente.endereco}
                            {...register("endereco")}
                        />
                        <input
                            type='date' 
                            placeholder='Data de nascimento'
                            defaultValue={cliente.data_nascimento}
                            {...register("data_nascimento")}
                        />
                        <button type='submit' disabled={isSubmitValid}>Editar</button>
                    </form>
                </Content>
            </Dialog.Portal>
    )
}
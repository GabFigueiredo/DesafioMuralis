import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { ClientContext } from '../../contexts/ClientsContext'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay } from './styles'
import { XCircle } from '@phosphor-icons/react'
import Cleave from 'cleave.js/react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


interface NewClientModalProps {
    setIsOpen: (isOpen: boolean) => void;
}

const NewClientSchema = z.object({
    nome: z.string(),
    cpf: z.string(),
    data_nascimento: z.string(),
    endereco: z.string(),
})

type newClientFormInputs = z.infer<typeof NewClientSchema>

export function NewClientModal({ setIsOpen }: NewClientModalProps) {
    const { createNewClient, state: {clientes} } = useContext(ClientContext)
    const [isSnackbarOpen, setIsSnackBarOpen] = useState(false)

    const {register,
        handleSubmit,
        watch,
        control,
        reset, }
        = useForm<newClientFormInputs>({
        resolver: zodResolver(NewClientSchema),
        mode: "onChange"
    })

    async function handleCreateNewClient(data: newClientFormInputs) {
        const isNewContactValid = clientes.some(client => client.cpf === data.cpf);


        if (!isNewContactValid) {
            createNewClient({
                id: 0,
                cpf: data.cpf,
                nome: data.nome,
                data_nascimento: data.data_nascimento,
                endereco: data.endereco
            })
            setIsOpen(false)
            reset()

        } else {
            setIsSnackBarOpen(true)
            return
        }

    }
    

    function handleSnackBarClose() {
        setIsSnackBarOpen(false)
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
                        <Dialog.Title>Novo Cliente</Dialog.Title>
                        <CloseButton>
                            <XCircle size={30}/>    
                        </CloseButton> 
                    </div>
                    <form onSubmit={handleSubmit(handleCreateNewClient)}>
                        <input
                            placeholder='Nome'
                            required
                            {...register("nome")}
                        />
                            <Controller
                                name="cpf"
                                control={control}
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
                            {...register("endereco")}
                        />
                        <input
                            type='date' 
                            placeholder='Data de nascimento'
                            {...register("data_nascimento")}
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
                            Esse CPF já está cadastrado no sistema
                        </Alert>
                    </Snackbar>
            </Dialog.Portal>
    )
}
import { createContext, ReactNode, useEffect, useReducer} from "react"
import { addNewClientAction, addNewContactAction, deleteClientAction, deleteContactAction, editClientAction, editContactAction, setDataAction } from "../reducers/Clientes/actions";
import { clientsReducer } from '../reducers/Clientes/reducer'
import axios from "axios";
import { Cliente } from "../interfaces/Cliente";
import { Contato } from "../interfaces/Contato";

interface StateProps {
    clientes: Cliente[],
    contatos: Contato[]
}

interface ClientContextType {
    state: StateProps,
    createNewClient: (newClient: Cliente) => void,
    deleteClient: (clientIDToRemove: number) => void,
    editClient: (IDToEdit: number, newValues: Cliente) => void
    createNewContact: (newContact: Contato) => void
    deleteContact: (contactIDToRemove: number) => void
    editContact: (IDToEdit: number, newValues: Contato) => void
}

interface ClientsContextProviderProps {
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ClientContext = createContext({} as ClientContextType)

export function ClientsContextProvider({children}: ClientsContextProviderProps) {

      const [state, dispatch] = useReducer(clientsReducer, {
        clientes: [],
        contatos: []
    });

      useEffect(() => {
        async function fetchClientData() {
            const ClientResponse = await axios.get("/api/clientes")
            const ContactResponse = await axios.get("/api/contatos")
            dispatch(setDataAction(ClientResponse.data, ContactResponse.data))
        } 
        fetchClientData()
    }, [])


    async function createNewClient(newClient: Cliente) {
        // Bate na APi
        const response = await axios.post("/api/clientes", {
            nome: newClient.nome,
            cpf: newClient.cpf,
            data_nascimento: newClient.data_nascimento,
            endereco: newClient.endereco
        })

        dispatch(addNewClientAction({
            ...newClient, id: response.data.id  
        }))
    }
    
    async function deleteClient(clientIDToRemove: number) {
        axios.delete(`/api/clientes/${clientIDToRemove}`)
        dispatch(deleteClientAction(clientIDToRemove))
    }

    function editClient(IDToEdit: number, newValues: Cliente) {
        // Bate na API
        axios.put(`/api/clientes/${IDToEdit}`, {
            nome: newValues.nome,
            cpf: newValues.cpf,
            data_nascimento: newValues.data_nascimento,
            endereco: newValues.endereco
        })

        dispatch(editClientAction(IDToEdit, newValues))
    }

    async function createNewContact(newContact: Contato) {
        const response = await axios.post("/api/contatos", {
            client_id: newContact.client_id,
            tipo: newContact.tipo,
            valor: newContact.valor,
            observacao: newContact.observacao,
        })

        dispatch(addNewContactAction({...newContact, id: response.data.id}));
    }

    function deleteContact(contactIDToRemove: number) {
        // Bate na API
        axios.delete(`/api/contatos/${contactIDToRemove}`)
        dispatch(deleteContactAction(contactIDToRemove))
    }
    
    function editContact(IDToEdit: number, newValues: Contato) {
        // Bate na API
        axios.put(`/api/contatos/${IDToEdit}`, {
            client_id: newValues.client_id,
            tipo: newValues.tipo,
            valor: newValues.valor,
            observacao: newValues.observacao
        })
        // Bate na API
        dispatch(editContactAction(IDToEdit, newValues))
    }



    return (
        <ClientContext.Provider value={{
                state,
                createNewClient,
                deleteClient,
                editClient,
                createNewContact,
                deleteContact,
                editContact
            }}>
            {children}
        </ClientContext.Provider>
    )
}


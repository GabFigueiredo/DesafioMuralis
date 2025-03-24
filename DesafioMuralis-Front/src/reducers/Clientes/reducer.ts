import { produce } from "immer"
import { ActionTypes } from "./actions"
import { Cliente } from "../../interfaces/Cliente"
import { Contato } from "../../interfaces/Contato"

interface State {
    clientes: Cliente[]
    contatos: Contato[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clientsReducer(state: State, action: any) {

    switch (action.type) {
        case ActionTypes.ADD_NEW_CLIENT:
            return produce(state, draft => {
                draft.clientes.push(action.payload.newClient)
        })

        case ActionTypes.DELETE_CLIENT:
            return produce(state, draft => {
                // Remove o Cliente
                draft.clientes = draft.clientes.filter(
                    client => client.id !== action.payload.clientIDToRemove
                );
                // Remove todos os contatos
                draft.contatos = draft.contatos.filter(
                    contato => contato.client_id !== action.payload.clientIDToRemove
                )
        })

        case ActionTypes.EDIT_CLIENT:
            return produce(state, draft => {
                const index = draft.clientes.findIndex(client => client.id === action.payload.IDToEdit);
                console.log(index)
                if (index !== -1) {
                    draft.clientes[index] = { ...draft.clientes[index], ...action.payload.newValues };
                }
        });

        case ActionTypes.ADD_NEW_CONTACT:
            return produce(state, draft => {
                draft.contatos.push(action.payload.newContact)
        })

        case ActionTypes.DELETE_CONTACT:
            return produce(state, draft => {
                // Remove o contato
                draft.contatos = draft.contatos.filter(
                    contato => contato.id !== action.payload.contactIDToRemove
                )
        })

        case ActionTypes.EDIT_CONTACT:
            return produce(state, draft => {
                const index = draft.contatos.findIndex(contato => contato.id === action.payload.IDToEdit);
                if (index !== -1) {
                    draft.contatos[index] = { ...draft.contatos[index], ...action.payload.newValues };
                }
        });

        case ActionTypes.SET_DATA:
            return produce(state, draft => {
                draft.clientes = action.payload.clientes;
                draft.contatos = action.payload.contatos;
            })

        default: return state;
    }
}

import { Cliente } from "../../interfaces/Cliente"
import { Contato } from "../../interfaces/Contato"

export enum ActionTypes {
    SET_DATA = "SET_DATA",

    ADD_NEW_CLIENT = "ADD_NEW_CLIENT",
    DELETE_CLIENT = "DELETE_CLIENT",
    EDIT_CLIENT = "EDIT_CLIENT",

    ADD_NEW_CONTACT = "ADD_NEW_CONTACT",
    DELETE_CONTACT = "DELETE_CONTACT",
    EDIT_CONTACT = "EDIT_CONTACT"
}

export function addNewClientAction(newClient: Cliente) {
    return {
        type: ActionTypes.ADD_NEW_CLIENT,
            payload: {
                newClient: newClient
            }
        }
}

export function deleteClientAction(clientIDToRemove: number) {
    return {
        type: ActionTypes.DELETE_CLIENT,
            payload: {
                clientIDToRemove: clientIDToRemove
            }
        }
}

export function editClientAction(IDToEdit: number, newValues: Cliente) {
    return {
        type: ActionTypes.EDIT_CLIENT,
            payload: {
                IDToEdit: IDToEdit,
                newValues: newValues
            }
        }
}

export function addNewContactAction(newContact: Contato) {
    return {
        type: ActionTypes.ADD_NEW_CONTACT,
            payload: {
                newContact: newContact
            }
        }
}

export function deleteContactAction(contactIDToRemove: number) {
    return {
        type: ActionTypes.DELETE_CONTACT,
            payload: {
                contactIDToRemove: contactIDToRemove
            }
        }
}

export function editContactAction(IDToEdit: number, newValues: Contato) {
    return {
        type: ActionTypes.EDIT_CONTACT,
            payload: {
                IDToEdit: IDToEdit,
                newValues: newValues
            }
        }
}

export function setDataAction(clientes: Cliente[], contatos: Contato) {
    return {
        type: ActionTypes.SET_DATA,
            payload: {
                clientes: clientes,
                contatos: contatos
            }
        }
}
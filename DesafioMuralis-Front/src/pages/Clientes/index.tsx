import { UserCirclePlus } from "@phosphor-icons/react";
import { ClientsTable } from "../../components/ClientsTable";
import { SearchBar, Button, MainContainer, SearchField, TableContainer, FilterOptionContainer, OptionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import { useContext, useState } from "react";
import { ClientContext } from "../../contexts/ClientsContext";
import { NewClientModal } from "../../components/NewClientModal";


export function Clientes() {
    const [isOpen, setIsOpen] = useState(false);
    const [filterContent, setFilterContent] = useState("")
    const [filterOption, setFilterOption] = useState("nome")

    const { state: {clientes} } = useContext(ClientContext);
    
    const filteredList = clientes.filter(cliente => {
        if (filterOption === "nome") {
            return cliente.nome.toLowerCase().includes(filterContent.toLowerCase())
        } else {
            return cliente.cpf.toLowerCase().includes(filterContent.toLowerCase())
        }
    })


    function handleChangeFilterOption(option: "nome" | "CPF") {
        if (filterOption === option) {
            return
        }
        setFilterOption(option)
    }   

    return (
        <MainContainer>
            <div>
                <strong>Clientes</strong>

                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                    <Dialog.Trigger asChild>
                    <Button>
                        <p>Criar</p>
                        <UserCirclePlus size={20}/>
                    </Button>
                    </Dialog.Trigger>
                    <NewClientModal setIsOpen={setIsOpen}/>
                </Dialog.Root>

            </div>
            <SearchBar>
                <SearchField>
                    <input 
                        placeholder={"Pesquisa por " + filterOption} 
                        onChange={(e) => setFilterContent(e.target.value)}
                        required>
                    </input>
                </SearchField>
                <FilterOptionContainer>
                    <OptionButton value="nome"
                        onClick={() => handleChangeFilterOption("nome")}>
                        Nome
                    </OptionButton>
                    <OptionButton value="CPF"
                        onClick={() => handleChangeFilterOption("CPF")}>
                        CPF
                    </OptionButton>
                </FilterOptionContainer>
            </SearchBar>

            <TableContainer>
                <ClientsTable clientes={filteredList}/> 
            </TableContainer>
        </MainContainer>
    )
}
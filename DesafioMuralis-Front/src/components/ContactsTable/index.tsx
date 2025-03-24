import { Contato } from "../../interfaces/Contato";
import { SingleRow } from "./components/Row";
import { TableStyle, TBodyTable, TheadTable } from "./styles";

interface ContactsTableProps {
    contatos: Contato[]
} 

export function ContactsTable({ contatos }: ContactsTableProps) {

    return (
        <TableStyle> 
            <TheadTable>
                <tr>
                    <th>ID</th>
                    <th>ID do Cliente</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Observação</th>
                </tr>
            </TheadTable>
            <TBodyTable>
                {contatos.map((contato, index) => {
                    return <SingleRow key={index} contato={contato} />
                })}
            </TBodyTable>
        </TableStyle>
    )
}


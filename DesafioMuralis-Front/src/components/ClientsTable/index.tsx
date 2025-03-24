import { Cliente } from "../../interfaces/Cliente";
import { SingleRow } from "./components/Row";
import { TableStyle, TBodyTable, TheadTable } from "./styles";

interface ClientsTableProps {
    clientes: Cliente[]
} 

export function ClientsTable({ clientes }: ClientsTableProps) {

    return (
        <TableStyle>
            <TheadTable>
                <tr>
                    <th>ID</th>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Data de nascimento</th>
                    <th>Endereço</th>
                </tr>
            </TheadTable>
            <TBodyTable>
                {clientes.map((cliente, index) => {
                    return <SingleRow key={index} cliente={cliente} />
                })}
            </TBodyTable>
        </TableStyle>
    )
}


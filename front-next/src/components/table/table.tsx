import { Row } from "./row";

interface TableProps<T extends object> {
  headers: string[];
  personas: T[];
}

export function Table<T extends object>({ headers, personas }: TableProps<T>) {

  return (
    <table className="w-full border rounded-md border-separate border-spacing-0 table-fixed">
      <thead>
        <tr className="bg-zinc-200">
          {headers.map((header, index) => (
            <th
              key={index}
              className="text-left text-base font-normal py-4 px-6 first:rounded-tl-md last:rounded-tr-md"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {personas.map((p, index) => (
          <Row<T> key={index} persona={p} />
        ))}
      </tbody>
    </table>
  );
}


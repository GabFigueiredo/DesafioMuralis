import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode
}

export function Table ({ children }: TableProps) {
  return(
    <table className="w-full border rounded-md border-separate border-spacing-0 table-fixed">
      {children}
    </table>
  )
}

Table.Header = function Header({headers}: {headers: string[]}) {
  return (
    <thead>
      <tr className="bg-zinc-200">
        {headers.map(header => {
          return <th className="text-left text-zinc-900 text-base font-normal py-4 px-6 first:rounded-tl-md last:rounded-tr-md" key={header}> {header}</th>
        })}
      </tr>
    </thead>
  )
}

Table.Body = function Body({ children }: {children: ReactNode}) {
  return (
    <tbody>
          {children}
    </tbody>
  );
};

Table.Row = function Row({ children }: {children: ReactNode}) {
  return (
    <tr className="bg-zinc-100 hover:bg-[#EFEFEF]">
      {children}
    </tr>
  );
};


Table.Td = function Td({ children }: {children: ReactNode}) {
  return (
      <td className="text-base text-zinc-900 font-normal py-4 px-6 text-left first:rounded-bl-md last:rounded-br-md last:w-fit">
        {children}
      </td>
  );
};
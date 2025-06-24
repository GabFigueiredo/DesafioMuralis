
interface PersonaCardProps {
    persona: T;
}

export function PersonaCard({persona, children} : ) {
 return (
    <table className="w-full border-separate border-spacing-0 border border-gray-300 rounded-md">
    <tbody>
      <div className="w-full max-h-[500px] overflow-auto">
        
        {contatos.map((contato, index) => {
          if (contato.client_id === cliente.id) {
            const isLast = index === contatos.filter(c => c.client_id === cliente.id).length - 1;
            return (
              <tr key={contato.id} className="bg-gray-100 border-t border-gray-300 first:border-t-0">
                <td
                  className={`text-base font-normal px-6 py-4 text-left ${
                    isLast ? 'rounded-bl-md' : ''
                  }`}
                >
                  {contato.id}
                </td>
                <td className="text-base font-normal px-6 py-4 text-left">{contato.tipo}</td>
                <td className="text-base font-normal px-6 py-4 text-left">{contato.valor}</td>
                <td
                  className={`text-base font-normal px-6 py-4 text-left ${
                    isLast ? 'rounded-br-md' : ''
                  }`}
                >
                  {contato.observacao}
                </td>
              </tr>
            );
          }
        })}
      </div>
    </tbody>
  </table>
 )
}
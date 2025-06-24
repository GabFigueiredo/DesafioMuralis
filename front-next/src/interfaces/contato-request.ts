export interface Contato {
  id: number;
  client_id: number;
  tipo: "Email" | "Telefone";
  valor: string;
  observacao: string;
}

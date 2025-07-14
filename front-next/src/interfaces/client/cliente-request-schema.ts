import { z } from "zod";

export const singleClientRequestSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  data_nascimento: z.string(),
  endereco: z.string(),
});

export type clientRequest = z.infer<typeof singleClientRequestSchema>;

export const clientRequestSchema = z.array(singleClientRequestSchema);

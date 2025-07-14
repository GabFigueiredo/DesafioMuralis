import { z } from "zod";

export const singleClientResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  cpf: z.string(),
  data_nascimento: z.string(),
  endereco: z.string(),
});

export type clientResponse = z.infer<typeof singleClientResponseSchema>;

export const clientResponseSchema = z.array(singleClientResponseSchema);

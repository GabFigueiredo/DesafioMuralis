import { z } from "zod";

export const singleContactResponseSchema = z.object({
  id: z.string(),
  client_id: z.string(),
  tipo: z.string(),
  valor: z.string(),
  observacao: z.string(),
});

export type contactResponse = z.infer<typeof singleContactResponseSchema>;

export const contactResponseSchema = z.array(singleContactResponseSchema);

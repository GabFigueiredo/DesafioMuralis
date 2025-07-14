import { z } from "zod";

export const singleContactRequestSchema = z.object({
  client_id: z.string(),
  tipo: z.string(),
  valor: z.string(),
  observacao: z.string(),
});

export type contactRequest = z.infer<typeof singleContactRequestSchema>;

export const contactRequestSchema = z.array(singleContactRequestSchema);

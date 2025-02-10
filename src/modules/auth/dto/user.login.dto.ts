import { z } from 'zod';

export const login = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export type LogininDto = z.infer<typeof login>;

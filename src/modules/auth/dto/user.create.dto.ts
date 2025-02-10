import { z } from 'zod';

export const register = z
  .object({
    username: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export type registerDto = z.infer<typeof register>;

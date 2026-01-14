import z from "zod";

export const registerAuthSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export type TRegisterAuth = z.infer<typeof registerAuthSchema>;

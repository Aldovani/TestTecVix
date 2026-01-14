import z from "zod";

export const loginAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TLoginAuth = z.infer<typeof loginAuthSchema>;

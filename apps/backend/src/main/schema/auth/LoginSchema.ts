import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().optional()
})

export type LoginRequest = z.infer<typeof LoginSchema>

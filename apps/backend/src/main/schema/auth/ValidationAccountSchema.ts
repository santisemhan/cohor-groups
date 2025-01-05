import { z } from "zod"

export const ValidationAccountSchema = z.object({
  userId: z.string().uuid(),
  token: z.string()
})

export type RegisterRequest = z.infer<typeof ValidationAccountSchema>

import { z } from "zod"

export const ResendEmailSchema = z.object({
  userId: z.string().uuid()
})

export type RegisterRequest = z.infer<typeof ResendEmailSchema>

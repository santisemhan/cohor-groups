import { z } from "zod"

export const ResendEmailSchema = z.object({
  userId: z.string().uuid()
})

export type ResendEmailRequest = z.infer<typeof ResendEmailSchema>

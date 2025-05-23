import { z } from "zod"

export const ValidateAccountSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().uuid()
})

export type ValidateAccountRequest = z.infer<typeof ValidateAccountSchema>

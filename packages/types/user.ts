import { z } from "zod"

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  birthdate: z.date().nullable()
})

export type User = z.infer<typeof UserSchema>

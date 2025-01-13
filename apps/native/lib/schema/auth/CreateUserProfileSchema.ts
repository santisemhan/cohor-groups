import { z } from "zod"

export const CreateUserProfileSchema = z.object({
  name: z.string(),
  birthdate: z.string()
})

export type CreateUserProfileForm = z.infer<typeof CreateUserProfileSchema>

import { z } from "zod"

export const CreateUserProfileSchema = z.object({
  name: z.string(),
  birthdate: z.string().refine(
    (date) => {
      const parsedDate = new Date(date)
      const today = new Date()
      return parsedDate <= today
    },
    {
      message: "Fecha de nacimiento invalida"
    }
  )
})

export type CreateUserProfileForm = z.infer<typeof CreateUserProfileSchema>

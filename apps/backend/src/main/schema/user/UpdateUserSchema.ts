import { z } from "zod"

export const UpdateUserSchema = z.object({
  name: z.string(),
  birthdate: z.string().pipe(z.coerce.date())
})

export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>

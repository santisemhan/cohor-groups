import { z } from "zod"

export const CreateGroupSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string()
})

export type CreateGroupForm = z.infer<typeof CreateGroupSchema>

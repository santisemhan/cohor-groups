import { z } from "zod"

export const CreateGroupSchema = z.object({
  name: z.string()
})

export type CreateGroupRequest = z.infer<typeof CreateGroupSchema>

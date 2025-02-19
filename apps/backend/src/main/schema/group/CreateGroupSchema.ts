import { z } from "zod"

export const CreateGroupSchema = z.object({
  name: z.string(),
  interestIds: z.array(z.string())
})

export type CreateGroupRequest = z.infer<typeof CreateGroupSchema>

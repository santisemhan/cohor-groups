import { z } from "zod"

export const JoinGroupSchema = z.object({
  groupCode: z.number()
})

export type JoinGroupRequest = z.infer<typeof JoinGroupSchema>

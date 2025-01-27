import { z } from "zod"

export const JoinGroupSchema = z.object({
  code: z.number()
})

export type JoinGroupRequest = z.infer<typeof JoinGroupSchema>

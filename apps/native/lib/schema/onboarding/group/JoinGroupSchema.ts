import { z } from "zod"

export const JoinGroupSchema = z.object({
  code: z.string().length(5)
})

export type JoinGroupForm = z.infer<typeof JoinGroupSchema>

import { z } from "zod"

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.number(),
  imageUrl: z.string()
})

export type Group = z.infer<typeof GroupSchema>

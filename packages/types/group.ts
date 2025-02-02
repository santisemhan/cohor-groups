import { z } from "zod"

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.number(),
  imageUrl: z.string()
})

export type Group = z.infer<typeof GroupSchema>

export const SwippeableGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  presentation: z.string(),
  members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      imageUrl: z.string()
    })
  )
})

export type SwippeableGroup = z.infer<typeof SwippeableGroupSchema>

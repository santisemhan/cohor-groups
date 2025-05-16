import { z } from "zod"
import { Interest } from "./interest"

export const GroupSchema = z.object({ id: z.string(), name: z.string(), code: z.number(), imageUrl: z.string() })

export type Group = z.infer<typeof GroupSchema>

export const SwippeableGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageURL: z.string(),
  interests: z.array(z.object({ name: z.string(), unicode: z.string() })),
  location: z.string(),
  members: z.array(z.object({ id: z.string(), name: z.string(), imageUrl: z.string() }))
})

export type SwippeableGroup = z.infer<typeof SwippeableGroupSchema>

export interface GroupResponse {
  id: string
  name: string
  imageURL: string
  interests: Interest[]
  members: { id: string; name: string | null }[] // Cambiar esto y asociar a una interface de usuario
}

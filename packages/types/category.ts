import { z } from "zod"

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  interests: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      unicode: z.string(),
      categoryId: z.string()
    })
  )
})

export type Category = z.infer<typeof CategorySchema>

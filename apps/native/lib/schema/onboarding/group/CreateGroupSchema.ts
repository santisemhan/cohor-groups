import { z } from "zod"

export const CreateGroupSchema = z.object({
  name: z.string().min(1, "El nombre del grupo es requerido"),
  description: z.string().min(1, "La descripción del grupo es requerida"),
  location: z.string().min(1, "La ubicación del grupo es requerida")
})

export type CreateGroupForm = z.infer<typeof CreateGroupSchema>

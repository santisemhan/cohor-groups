import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z.string().min(1, { message: "Contraseña no válida" })
})

export type LoginForm = z.infer<typeof LoginFormSchema>

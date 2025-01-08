import { z } from "zod"

export const RegisterFormSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
})

export type RegisterForm = z.infer<typeof RegisterFormSchema>

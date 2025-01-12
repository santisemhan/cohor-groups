import { z } from "zod"

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).optional(),
    isThirdParty: z.boolean().default(false)
  })
  .superRefine((data, ctx) => {
    if (data.isThirdParty && data.password) {
      ctx.addIssue({
        path: ["password"],
        message: "Password should not be provided when isThirdParty is true.",
        code: "custom"
      })
    }

    if (!data.isThirdParty && !data.password) {
      ctx.addIssue({
        path: ["password"],
        message: "Password is required when isThirdParty is false.",
        code: "custom"
      })
    }
  })

export type RegisterRequest = z.infer<typeof RegisterSchema>

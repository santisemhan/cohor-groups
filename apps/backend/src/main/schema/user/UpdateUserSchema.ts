import { OnboardingStep } from "@prisma/client"
import { z } from "zod"

export const UpdateUserSchema = z.object({
  name: z.string(),
  birthdate: z.string().pipe(z.coerce.date()),
  onboardingStep: z.nativeEnum(OnboardingStep)
})

export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>

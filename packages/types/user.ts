import { z } from "zod"
import { OnboardingStep } from "./onboarding-step"

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  birthdate: z.date().nullable(),
  onboardingStep: z.nativeEnum(OnboardingStep).nullable()
})

export type User = z.infer<typeof UserSchema>

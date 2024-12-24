import { z } from "zod"

export const AuthorizerContextSchema = z.object({
  id: z.string().describe("The user ID."),
  email: z.string().describe("The user email.")
})

export type AuthorizerContext = z.infer<typeof AuthorizerContextSchema>

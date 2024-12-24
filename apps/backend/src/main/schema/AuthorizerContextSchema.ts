import { z } from "zod"

export const AuthorizerContextSchema = z.object({
  id: z.string().describe("The user ID.")
})

export type AuthorizerContext = z.infer<typeof AuthorizerContextSchema>

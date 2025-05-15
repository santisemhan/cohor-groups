import { z } from "zod"

export const createPaginationOptionsSchema = <T extends Record<string, unknown>>(validKeys: (keyof T)[]) => {
  const baseSchema = z.object({
    page: z.number().int().positive().default(1), // .default() ya asegura un valor
    pageSize: z.number().int().positive().max(100).default(10),
    orderBy: z.enum(["id", ...validKeys] as [string, ...string[]]).default("id"),
    orderDirection: z.enum(["asc", "desc"] as const).default("asc")
  })

  return baseSchema.nullable().transform((input) => input ?? baseSchema.parse({}))
}

export type PaginationOptions<T extends Record<string, unknown>> = z.infer<
  ReturnType<typeof createPaginationOptionsSchema<T>>
>

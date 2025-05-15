import { z } from "zod"

export const createPaginationOptionsSchema = <T extends Record<string, unknown>>(validKeys: (keyof T)[]) => {
  return z.object({
    page: z.number().int().positive().optional(),
    pageSize: z.number().int().positive().optional(),
    orderBy: z.enum(validKeys as [string, ...string[]]).optional(),
    orderDirection: z.enum(["asc", "desc"] as const).optional()
  })
}

export type PaginationOptions<T extends Record<string, unknown>> = z.infer<
  ReturnType<typeof createPaginationOptionsSchema<T>>
>

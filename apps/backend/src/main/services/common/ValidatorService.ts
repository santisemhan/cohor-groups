import { SafeParseReturnType, z } from "zod"

import { Injectable } from "../../support/decorator/Injectable"
import { ValidationError } from "../../errors/ValidationError"

/**
 * @description
 *  Main validation service, that provides a mechanism to match a model with
 *	an expected schema.
 */
@Injectable()
export class ValidationService {
  /**
   * @description
   *	Validates that a given model matchs the intrinsic schema of the validator.
   *
   * @param schema
   *	The expected schema of the input.
   * @param input
   *	The model that will be validated against the schema.
   * @returns
   *	A type-safe version of the model that respects the schema.
   * @throws {ValidationError}
   *	If the model can't be matched against the schema.
   */
  public validateOrFail<T extends z.ZodTypeAny>(schema: T, input: unknown): z.infer<T> {
    const output = schema.safeParse(input) as SafeParseReturnType<unknown, z.infer<T>>
    if (output.success) {
      return output.data
    }
    throw new ValidationError(output)
  }

  public validate<T extends z.ZodTypeAny>(
    schema: T,
    input: unknown
  ): { error: ValidationError | undefined; value: z.infer<T> } {
    const output = schema.safeParse(typeof input === "string" ? JSON.parse(input) : input) as SafeParseReturnType<
      unknown,
      z.infer<T>
    >
    if (output.success) {
      return {
        error: undefined,
        value: output.data
      }
    }
    return {
      error: new ValidationError(output),
      value: undefined
    }
  }
}

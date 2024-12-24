import { SafeParseError, ZodIssue } from "zod"
import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	A general validation error of some model.
 */
export class ValidationError extends ApplicationError<{ errors: ZodIssue[] }> {
  public constructor(output: SafeParseError<unknown>) {
    super(ErrorCode.ValidationError, "The schema of the provided model is invalid.", {
      errors: output.error.issues
    })
  }
}

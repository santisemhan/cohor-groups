import { HTTPParameterSource } from "../support/http/HTTPParameterSource"
import { Enum } from "../support/language/Enum"
import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"
import { ValidationError } from "./ValidationError"

/**
 * @description
 *	Representa un error de validación, resultado de comparar el esquema
 *  esperado, con el objeto original procesado.
 */
export class HttpValidationError extends ApplicationError<unknown> {
  public constructor(output: ValidationError, original: unknown, parameterSource: HTTPParameterSource) {
    super(
      ErrorCode.ValidationError,
      `The schema of the request is invalid (source: ${Enum.keyFromValue(HTTPParameterSource, parameterSource)}).`,
      {
        ...output.payload,
        original
      }
    )
  }
}

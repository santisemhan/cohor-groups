import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

/**
 * @description
 *	Representa un error producido al recibir una entidad de un tipo que no es
 *	compatible con el MIME-Type esperado (e.g., recibir un documento XML
 *	cuando se esperaba un objecto JSON).
 */
export class UnexpectedMediaType extends ApplicationError<{ detail: string }> {
  public constructor(detail: string) {
    super(ErrorCode.UnexpectedMediaType, "Unexpected media format in the body. Deserialization cannot be applied.", {
      detail
    })
  }
}

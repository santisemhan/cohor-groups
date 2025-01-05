import { ErrorResponse } from "resend"
import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

export class CannotSendEmail extends ApplicationError<ErrorResponse> {
  public constructor(payload: ErrorResponse) {
    super(ErrorCode.CannotSendEmailError, "The email could not be sent", payload)
  }
}

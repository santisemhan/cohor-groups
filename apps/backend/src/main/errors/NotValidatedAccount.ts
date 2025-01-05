import { ErrorResponse } from "resend"
import { ApplicationError } from "./ApplicationError"
import { ErrorCode } from "./ErrorCode"

export class NotValidatedAccount extends ApplicationError<ErrorResponse> {
  public constructor() {
    super(ErrorCode.NotValidatedAccountError, "The account is not validated")
  }
}

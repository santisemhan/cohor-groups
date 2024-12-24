import { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { MIMEType } from "../../support/http/MIMEType"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { Injectable } from "../../support/decorator/Injectable"
import { ValidationService } from "../../services/common/ValidatorService"
import { HttpValidationError } from "../../errors/HttpValidationError"
import { HTTPParameterSource } from "../../support/http/HTTPParameterSource"
import { AuthenticationService } from "../../services/AuthenticationService"
import { LoginSchema } from "../../schema/auth/LoginSchema"

@Injectable()
export class LoginFunction extends APIServerlessFunction {
  constructor(
    private readonly validationService: ValidationService,
    private readonly authenticationService: AuthenticationService
  ) {
    super()
  }

  public override async handleAsync(event: APIGatewayProxyEventV2, _context: Context) {
    const { error, value: body } = this.validationService.validate(LoginSchema, event.body)
    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.body, HTTPParameterSource.BODY)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const { email, password } = body
    const token = await this.authenticationService.loginAsync(email, password)

    return new HTTPResponse(MIMEType.JSON)
      .body({
        token
      })
      .statusCode(HTTPStatusCode.Created)
  }
}

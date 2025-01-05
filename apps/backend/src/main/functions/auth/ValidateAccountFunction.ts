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
import { ValidationAccountSchema } from "../../schema/auth/ValidationAccountSchema"

@Injectable()
export class ValidateAccountFunction extends APIServerlessFunction {
  constructor(
    private readonly validationService: ValidationService,
    private readonly authenticationService: AuthenticationService
  ) {
    super()
  }

  public override async handleAsync(event: APIGatewayProxyEventV2, _context: Context) {
    const { error, value: pathParameters } = this.validationService.validate(
      ValidationAccountSchema,
      event.pathParameters
    )
    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.body, HTTPParameterSource.PATH)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const { userId, token } = pathParameters
    await this.authenticationService.validateAccountAsync(userId, token)

    return new HTTPResponse(MIMEType.JSON).statusCode(HTTPStatusCode.NoContent)
  }
}

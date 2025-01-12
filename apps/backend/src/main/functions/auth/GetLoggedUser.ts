import { APIGatewayProxyWithLambdaAuthorizerEvent, Context } from "aws-lambda"
import { ValidationService } from "../../services/common/ValidatorService"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { AuthorizerContext, AuthorizerContextSchema } from "../../schema/AuthorizerContextSchema"
import { HTTPParameterSource } from "../../support/http/HTTPParameterSource"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { HttpValidationError } from "../../errors/HttpValidationError"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { Injectable } from "../../support/decorator/Injectable"
import { MIMEType } from "../../support/http/MIMEType"
import { UserService } from "../../services/UserService"

@Injectable()
export class GetLoggedUserFunction extends APIServerlessFunction {
  constructor(
    private readonly validationService: ValidationService,
    private readonly userService: UserService
  ) {
    super()
  }

  public override async handleAsync(
    event: APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>,
    _context: Context
  ) {
    const { error, value } = this.validationService.validate(AuthorizerContextSchema, event.requestContext.authorizer)
    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.body, HTTPParameterSource.CLAIMS)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const user = await this.userService.getUserByIdAsync(value.id)

    return new HTTPResponse(MIMEType.JSON).body({ user }).statusCode(HTTPStatusCode.Ok)
  }
}

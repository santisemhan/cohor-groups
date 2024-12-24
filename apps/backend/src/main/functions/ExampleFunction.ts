import { APIServerlessFunction } from "../support/serverless/ApiServerlessFunction"
import { APIGatewayProxyWithLambdaAuthorizerEvent, Context } from "aws-lambda"
import { HTTPResponse } from "../support/http/HTTPResponse"
import { MIMEType } from "../support/http/MIMEType"
import { HTTPStatusCode } from "../support/http/HTTPStatusCode"
import { Injectable } from "../support/decorator/Injectable"
import { ValidationService } from "../services/common/ValidatorService"
import { AuthorizerContext, AuthorizerContextSchema } from "../schema/AuthorizerContextSchema"
import { HttpValidationError } from "../errors/HttpValidationError"
import { HTTPParameterSource } from "../support/http/HTTPParameterSource"

@Injectable()
export class ExampleFunction extends APIServerlessFunction {
  constructor(private readonly validationService: ValidationService) {
    super()
  }

  public override async handleAsync(
    event: APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>,
    _context: Context
  ) {
    const { error, value } = this.validationService.validate(AuthorizerContextSchema, event.requestContext.authorizer)
    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.body, HTTPParameterSource.BODY)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    return new HTTPResponse(MIMEType.JSON).body({ message: `Hola ${value.email}!` }).statusCode(HTTPStatusCode.Ok)
  }
}

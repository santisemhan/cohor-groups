import { APIGatewayProxyWithLambdaAuthorizerEvent, Context } from "aws-lambda"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { MIMEType } from "../../support/http/MIMEType"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { Injectable } from "../../support/decorator/Injectable"
import { ValidationService } from "../../services/common/ValidatorService"
import { HttpValidationError } from "../../errors/HttpValidationError"
import { HTTPParameterSource } from "../../support/http/HTTPParameterSource"
import { UserService } from "../../services/UserService"
import { UpdateUserSchema } from "../../schema/user/UpdateUserSchema"
import { AuthorizerContext, AuthorizerContextSchema } from "../../schema/AuthorizerContextSchema"

import { OnboardingStep } from "@cohor/types"

@Injectable()
export class UpdateUserFunction extends APIServerlessFunction {
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
    const { error: authorizerError, value: contextValue } = this.validationService.validate(
      AuthorizerContextSchema,
      event.requestContext.authorizer
    )
    if (authorizerError) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(authorizerError, event.requestContext.authorizer, HTTPParameterSource.CLAIMS)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const { error, value: body } = this.validationService.validate(UpdateUserSchema, event.body)

    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.body, HTTPParameterSource.BODY)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const { name, birthdate, onboardingStep } = body

    await this.userService.updateAsync(contextValue.id, name, birthdate, onboardingStep as OnboardingStep)

    return new HTTPResponse(MIMEType.JSON).statusCode(HTTPStatusCode.NoContent)
  }
}

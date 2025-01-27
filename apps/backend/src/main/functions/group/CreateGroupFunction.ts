import { APIGatewayProxyWithLambdaAuthorizerEvent, Context } from "aws-lambda"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { MIMEType } from "../../support/http/MIMEType"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { Injectable } from "../../support/decorator/Injectable"
import { ValidationService } from "../../services/common/ValidatorService"
import { HttpValidationError } from "../../errors/HttpValidationError"
import { HTTPParameterSource } from "../../support/http/HTTPParameterSource"
import { AuthorizerContext, AuthorizerContextSchema } from "../../schema/AuthorizerContextSchema"
import { CreateGroupSchema } from "../../schema/group/CreateGroupSchema"
import { GroupService } from "../../services/GroupService"

@Injectable()
export class CreateGroupFunction extends APIServerlessFunction {
  constructor(
    private readonly validationService: ValidationService,
    private readonly groupService: GroupService
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

    const { error: createGroupError, value: body } = this.validationService.validate(CreateGroupSchema, event.body)
    if (createGroupError) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(createGroupError, event.body, HTTPParameterSource.CLAIMS)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const { id, code, name } = await this.groupService.createAsync(body.name, contextValue.id)
    return new HTTPResponse(MIMEType.JSON).body({ id, code, name }).statusCode(HTTPStatusCode.Ok)
  }
}

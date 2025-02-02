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
import { JoinGroupSchema } from "../../schema/group/JoinGroupSchema"
import { GroupService } from "../../services/GroupService"
import { CloudinaryService } from "../../services/storage/CloudinaryService"

@Injectable()
export class JoinGroupFunction extends APIServerlessFunction {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
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

    const { error: joinGroupError, value: body } = this.validationService.validate(JoinGroupSchema, event.body)
    if (joinGroupError) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(joinGroupError, event.body, HTTPParameterSource.CLAIMS)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const user = await this.groupService.joinGroupOrThrowAsync(body.code, contextValue.id)
    const image = await this.cloudinaryService.getUrlAsync("group-profile", user.groups[0].group.id)

    return new HTTPResponse(MIMEType.JSON)
      .body({ ...user.groups[0].group, imageUrl: image })
      .statusCode(HTTPStatusCode.Ok)
  }
}

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
import { GroupService } from "../../services/GroupService"
import { CloudinaryService } from "../../services/storage/CloudinaryService"

@Injectable()
export class GetGroupsFunction extends APIServerlessFunction {
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
    const { error, value } = this.validationService.validate(AuthorizerContextSchema, event.requestContext.authorizer)
    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.requestContext.authorizer, HTTPParameterSource.CLAIMS)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const loggedUserGroup = await this.groupService.getUserGroup(value.id)

    if (!loggedUserGroup) {
      return new HTTPResponse(MIMEType.JSON).statusCode(HTTPStatusCode.NotFound)
    }

    const groupsRaw = await this.groupService.getGroups(loggedUserGroup.id)

    const groups = await Promise.all(
      groupsRaw.map(async (group) => ({
        ...group,
        imageURL: await this.cloudinaryService.getUrlAsync("group-profile", group.id)
      }))
    )

    return new HTTPResponse(MIMEType.JSON).body(groups).statusCode(HTTPStatusCode.Ok)
  }
}

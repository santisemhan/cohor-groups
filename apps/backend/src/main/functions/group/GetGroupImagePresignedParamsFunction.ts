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
import { CloudinaryService } from "../../services/storage/CloudinaryService"
import { GroupService } from "../../services/GroupService"

@Injectable()
export class GetGroupImagePresignedParamsFunction extends APIServerlessFunction {
  constructor(
    private readonly validationService: ValidationService,
    private readonly groupService: GroupService,
    private readonly cloudinaryService: CloudinaryService
  ) {
    super()
  }

  public override async handleAsync(
    event: APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>,
    _context: Context
  ) {
    const { error: authorizerError, value } = this.validationService.validate(
      AuthorizerContextSchema,
      event.requestContext.authorizer
    )
    if (authorizerError) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(authorizerError, event.requestContext.authorizer, HTTPParameterSource.CLAIMS)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const group = await this.groupService.getUserGroup(value.id)
    const { signature, timestamp } = await this.cloudinaryService.putPresignedUrlAsync("group-profile", group.id)

    return new HTTPResponse(MIMEType.JSON).body({ signature, timestamp }).statusCode(HTTPStatusCode.Ok)
  }
}

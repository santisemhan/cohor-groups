import {
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerResult,
  APIGatewayAuthorizerResultContext,
  APIGatewayRequestAuthorizerEvent,
  Context,
  PolicyDocument
} from "aws-lambda"
import { Injectable } from "../support/decorator/Injectable"
import { ServerlessFunction } from "../support/serverless/ServerlessFuncion"
import { Logger } from "../support/language/Logger"
import { LoggingService } from "../services/common/LogginService"
import { PermissionSpecification } from "./Permission"
import { AuthenticationService } from "../services/AuthenticationService"
import { IAMService } from "../services/aws/IAMService"
import { APIGatewayService } from "../services/aws/APIGatewayService"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { EndpointPermissionError } from "../errors/EndpointPermissionError"

@Injectable()
export class RoleAuthorizerFunction
  implements ServerlessFunction<APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult>
{
  private logger: Logger

  constructor(
    private readonly apiGatewayService: APIGatewayService,
    private readonly authenticationService: AuthenticationService,
    private readonly iamService: IAMService,
    private readonly loggingService: LoggingService
  ) {
    this.logger = this.loggingService.getLogger("RoleAuthorizerFunction")
  }

  public async runAsync(
    event: APIGatewayRequestAuthorizerEvent,
    _context: Context
  ): Promise<APIGatewayAuthorizerResult> {
    try {
      // Removing the Bearer word.
      let token = event.headers?.Authorization?.split(" ")[1]
      if (token === undefined) {
        token = event.headers?.authorization?.split(" ")[1] || ""
      }

      const endpoint = `${event.httpMethod}${event.resource}`
      const functionPermissions = PermissionSpecification.getFunctionPermissionsToString(endpoint)
      if (functionPermissions.length <= 0) {
        throw new EndpointPermissionError(endpoint)
      }
      const validToken = await this.authenticationService.verifyToken(token)
      if (validToken === null) {
        throw new UnauthorizedError()
      }

      if (!functionPermissions.includes(validToken.role as string)) {
        throw new UnauthorizedError()
      }

      const policy: PolicyDocument = this.iamService.generatePolicy([
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: "*" // event.methodArn
        }
      ])

      const loggedUserInfo: APIGatewayAuthorizerResultContext = {
        id: validToken.sub,
        email: validToken.email as string
      }

      return this.apiGatewayService.authorizerResult(policy, loggedUserInfo)
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedError()
    }
  }
}

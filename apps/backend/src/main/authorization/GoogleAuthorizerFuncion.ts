import {
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEvent,
  Context,
  PolicyDocument
} from "aws-lambda"
import { Injectable } from "../support/decorator/Injectable"
import { ServerlessFunction } from "../support/serverless/ServerlessFuncion"
import { Logger } from "../support/language/Logger"
import { LoggingService } from "../services/common/LogginService"
import { AuthenticationService } from "../services/AuthenticationService"
import { IAMService } from "../services/aws/IAMService"
import { APIGatewayService } from "../services/aws/APIGatewayService"
import { OAuth2Client } from "google-auth-library"
import { UnauthorizedError } from "../errors/UnauthorizedError"

@Injectable()
export class GoogleAuthorizerFunction
  implements ServerlessFunction<APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult>
{
  private logger: Logger

  constructor(
    private readonly apiGatewayService: APIGatewayService,
    private readonly authenticationService: AuthenticationService,
    private readonly iamService: IAMService,
    private readonly loggingService: LoggingService
  ) {
    this.logger = this.loggingService.getLogger("GoogleAuthorizerFunction")
  }

  public async runAsync(
    event: APIGatewayRequestAuthorizerEvent,
    _context: Context
  ): Promise<APIGatewayAuthorizerResult> {
    try {
      const idToken = event.headers?.Idtoken

      if (idToken === "") {
        const policy: PolicyDocument = this.iamService.generatePolicy([
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*"
          }
        ])

        return this.apiGatewayService.authorizerResult(policy)
      }

      const token = await new OAuth2Client().verifyIdToken({
        idToken: idToken as string,
        audience: [
          "300195889471-o655ub38lc5e0obfh9hicqpecundh0hg.apps.googleusercontent.com",
          "300195889471-gebukno7f83ouj36me59bghuuquf4onj.apps.googleusercontent.com",
          "300195889471-lka9cqqind6u4hloqdcsl4vne93nt5gg.apps.googleusercontent.com"
        ]
      })
      const payload = token.getPayload()
      if (!payload) {
        console.log("Payload not found")
        throw new UnauthorizedError()
      }

      if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedError()
      }

      if (!payload.email || !event.headers?.Email || payload.email !== event.headers.Email) {
        throw new UnauthorizedError()
      }

      const policy: PolicyDocument = this.iamService.generatePolicy([
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: "*" // event.methodArn
        }
      ])

      return this.apiGatewayService.authorizerResult(policy)
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedError()
    }
  }
}

import { APIGatewayAuthorizerResult, APIGatewayAuthorizerResultContext, PolicyDocument } from "aws-lambda"
import { Injectable } from "../../support/decorator/Injectable"
import { randomUUID } from "crypto"

/**
 * @description
 *	Servicio de acceso a Amazon Api Gateway.
 *
 *	@see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ApiGatewayManagementApi.html
 */
@Injectable()
export class APIGatewayService {
  public authorizerResult(
    policy: PolicyDocument,
    context: APIGatewayAuthorizerResultContext | undefined = undefined
  ): APIGatewayAuthorizerResult {
    const result: APIGatewayAuthorizerResult = {
      principalId: randomUUID(),
      policyDocument: policy,
      context
    }
    return result
  }
}

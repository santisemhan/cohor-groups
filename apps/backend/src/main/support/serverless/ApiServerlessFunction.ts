import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  APIGatewayProxyWithLambdaAuthorizerEvent,
  Context
} from "aws-lambda"
import { HTTPResponse } from "../http/HTTPResponse"
import { HTTPStatusCode } from "../http/HTTPStatusCode"
import { MIMEType } from "../http/MIMEType"
import { AuthorizerContext } from "../../schema/AuthorizerContextSchema"
import { UnknownError } from "../../errors/UnknownError"
import { UnexpectedMediaType } from "../../errors/UnexpectedMediaType"
import { ServerlessFunction } from "./ServerlessFuncion"

export abstract class APIServerlessFunction
  implements ServerlessFunction<APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>, APIGatewayProxyResultV2>
{
  public async runAsync(
    event: APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>,
    context: Context
  ): Promise<APIGatewayProxyResultV2> {
    const { origin } = event.headers
    try {
      const response = await this.handleAsync(event, context)
      return response.asAPIGatewayResponse(origin)
    } catch (error) {
      if (error instanceof SyntaxError) {
        return new HTTPResponse(MIMEType.JSON)
          .body([new UnexpectedMediaType(error.message)])
          .statusCode(HTTPStatusCode.UnsupportedMediaType)
          .asAPIGatewayResponse(origin)
      }
      return new HTTPResponse(MIMEType.JSON)
        .body([new UnknownError(error)])
        .statusCode(HTTPStatusCode.InternalServerError)
        .asAPIGatewayResponse(origin)
    }
  }

  public abstract handleAsync<R>(
    event: APIGatewayProxyEventV2 | APIGatewayProxyWithLambdaAuthorizerEvent<AuthorizerContext>,
    context: Context
  ): Promise<HTTPResponse<R>>
}

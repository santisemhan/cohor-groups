import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda"
import { ServerlessFunction } from "./ServerlessFuncion"
import { HTTPResponse } from "../http/HTTPResponse"
import { HTTPStatusCode } from "../http/HTTPStatusCode"
import { MIMEType } from "../http/MIMEType"
import { UnexpectedMediaType } from "../../errors/UnexpectedMediaType"
import { UnknownError } from "../../errors/UnknownError"

export abstract class APIServerlessFunction
  implements ServerlessFunction<APIGatewayProxyEventV2, APIGatewayProxyResultV2>
{
  private async consumerAsync(event: APIGatewayProxyEventV2, context: Context) {
    return this.handleAsync(event, context)
  }

  public async runAsync(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> {
    try {
      return this.consumerAsync(event, context)
    } catch (error) {
      if (error instanceof SyntaxError) {
        return new HTTPResponse(MIMEType.JSON)
          .body([new UnexpectedMediaType(error.message)])
          .statusCode(HTTPStatusCode.UnsupportedMediaType)
          .asAPIGatewayResponse()
      }
      return new HTTPResponse(MIMEType.JSON)
        .body([new UnknownError(error)])
        .statusCode(HTTPStatusCode.InternalServerError)
        .asAPIGatewayResponse()
    }
  }

  public abstract handleAsync(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2>
}

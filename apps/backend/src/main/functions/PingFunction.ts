import { APIServerlessFunction } from "../support/serverless/ApiServerlessFunction"
import { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { HTTPResponse } from "../support/http/HTTPResponse"
import { MIMEType } from "../support/http/MIMEType"
import { HTTPStatusCode } from "../support/http/HTTPStatusCode"
import { Injectable } from "../support/decorator/Injectable"

@Injectable()
export class PingFunction extends APIServerlessFunction {
  constructor() {
    super()
  }

  public override async handleAsync(_event: APIGatewayProxyEventV2, _context: Context) {
    return new HTTPResponse(MIMEType.JSON).body({ message: "Pong" }).statusCode(HTTPStatusCode.Ok)
  }
}

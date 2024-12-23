import { Component } from "../support/decorator/Component"
import { APIServerlessFunction } from "../support/serverless/ApiServerlessFunction"
import { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { HTTPResponse } from "../support/http/HTTPResponse"
import { MIMEType } from "../support/http/MIMEType"
import { HTTPStatusCode } from "../support/http/HTTPStatusCode"

@Component()
export class ExampleFunction extends APIServerlessFunction {
  constructor() {
    super()
  }

  public override async handleAsync(_event: APIGatewayProxyEventV2, _context: Context) {
    return new HTTPResponse(MIMEType.JSON)
      .body({ message: "Hello World!" })
      .statusCode(HTTPStatusCode.Ok)
      .asAPIGatewayResponse()
  }
}

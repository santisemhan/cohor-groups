import { Component } from "../support/decorator/Component"
import { APIServerlessFunction } from "../support/serverless/ApiServerlessFunction"
import { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { HTTPResponse } from "../support/http/HTTPResponse"
import { MIMEType } from "../support/http/MIMEType"
import { HTTPStatusCode } from "../support/http/HTTPStatusCode"
import { UserRepository } from "../repository/UserRepository"

@Component()
export class ExampleFunction extends APIServerlessFunction {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  public override async handleAsync(_event: APIGatewayProxyEventV2, _context: Context) {
    console.log(this.userRepository)
    const users = await this.userRepository.getAllAsync()
    return new HTTPResponse(MIMEType.JSON)
      .body({ message: "Hello World!", users })
      .statusCode(HTTPStatusCode.Ok)
      .asAPIGatewayResponse()
  }
}

import bcrypt from "bcryptjs"

import { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { MIMEType } from "../../support/http/MIMEType"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { Injectable } from "../../support/decorator/Injectable"
import { ValidationService } from "../../services/common/ValidatorService"
import { HttpValidationError } from "../../errors/HttpValidationError"
import { HTTPParameterSource } from "../../support/http/HTTPParameterSource"
import { RegisterSchema } from "../../schema/auth/RegisterSchema"
import { AuthenticationService } from "../../services/AuthenticationService"

@Injectable()
export class LoginFunction extends APIServerlessFunction {
  constructor(
    private readonly validationService: ValidationService,
    private readonly authenticationService: AuthenticationService
  ) {
    super()
  }

  public override async handleAsync(event: APIGatewayProxyEventV2, _context: Context) {
    const { error, value: body } = this.validationService.validate(RegisterSchema, event.body)
    if (error) {
      return new HTTPResponse(MIMEType.JSON)
        .body([new HttpValidationError(error, event.body, HTTPParameterSource.BODY)])
        .statusCode(HTTPStatusCode.BadRequest)
    }

    const { email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10)
    const token = await this.authenticationService.registerAsync({ email, password: hashedPassword, name: "Example" })

    return new HTTPResponse(MIMEType.JSON)
      .body({
        token
      })
      .statusCode(HTTPStatusCode.Created)
  }
}

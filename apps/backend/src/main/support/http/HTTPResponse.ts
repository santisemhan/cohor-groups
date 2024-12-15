import { APIGatewayProxyResultV2 } from "aws-lambda"
import { HTTPStatusCode } from "./HTTPStatusCode"
import { MIMEType } from "./MIMEType"

export class HTTPResponse<T> {
  private _body: string | undefined
  private _headers: { [header: string]: boolean | number | string } | undefined
  private _statusCode: HTTPStatusCode

  public constructor(contentType: MIMEType = MIMEType.JSON) {
    this._body = undefined
    this._headers = {
      "Content-Type": contentType
    }
    this._statusCode = HTTPStatusCode.Ok
  }

  public body(payload: T): HTTPResponse<T> {
    this._body = JSON.stringify(payload)
    return this
  }

  public statusCode(statusCode: HTTPStatusCode): HTTPResponse<T> {
    this._statusCode = statusCode
    return this
  }

  public asAPIGatewayResponse(): APIGatewayProxyResultV2 {
    return {
      body: this._body,
      cookies: undefined,
      headers: this._headers,
      isBase64Encoded: false,
      statusCode: this._statusCode
    }
  }
}

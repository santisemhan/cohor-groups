import { APIGatewayProxyResultV2 } from "aws-lambda"
import { MIMEType } from "./MIMEType"
import { HTTPStatusCode } from "./HTTPStatusCode"
import { HTTPHeader } from "./HTTPHeader"

export class HTTPResponse<T> {
  private _body: string | undefined

  private _headers: { [header: string]: boolean | number | string }

  private _origins: string[]

  private _statusCode: HTTPStatusCode

  public constructor(contentType: MIMEType = MIMEType.JSON) {
    this._body = undefined
    this._headers = {
      [HTTPHeader.ContentType]: contentType
    }
    // Should be using the WebConfigurationProvider instead.
    this._origins = (process.env.SMART_CHANNEL_APPLICATION_FRONTEND_ORIGINS || "http://localhost:8080").split(",")
    this._statusCode = HTTPStatusCode.Ok
  }

  public header(header: string, value: boolean | number | string) {
    this._headers[header] = value
    return this
  }

  public body(payload: T): HTTPResponse<T> {
    this._body = JSON.stringify(payload)
    return this
  }

  public statusCode(statusCode: HTTPStatusCode): HTTPResponse<T> {
    this._statusCode = statusCode
    return this
  }

  public asAPIGatewayResponse(origin: string | undefined = undefined): APIGatewayProxyResultV2 {
    // This CORS-Origin logic should be set on a middleware (after migrating to Next.js).
    this.header(HTTPHeader.AccessControlAllowCredentials, true)
    if (origin !== undefined && this._origins.includes(origin)) {
      this.header(HTTPHeader.AccessControlAllowOrigin, origin)
    } else {
      this.header(HTTPHeader.AccessControlAllowOrigin, this._origins[0])
    }
    return {
      body: this._body,
      cookies: undefined,
      headers: this._headers,
      isBase64Encoded: false,
      statusCode: this._statusCode
    }
  }
}

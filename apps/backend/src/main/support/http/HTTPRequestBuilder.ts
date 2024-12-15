import { AxiosHeaders, AxiosRequestHeaders, responseEncoding, ResponseType } from "axios"
import { HTTPMethod } from "./HTTPMethod"
import { HTTPRequest } from "./HTTPRequest"
import { MIMEType } from "./MIMEType"
import { Buildable } from "../language/Buildable"

export class HTTPRequestBuilder<I = undefined> implements Buildable<HTTPRequest<I>> {
  private static readonly DEFAULT_RESPONSE_TYPE = "json"
  private static readonly DEFAULT_TIMEOUT = 5 * 1000

  public _endpoint: URL = new URL("http://localhost:8080/")
  public _headers: AxiosRequestHeaders
  public _method: HTTPMethod
  public _payload: I | undefined
  public _responseEncoding: responseEncoding
  public _responseType: ResponseType
  public _timeout: number

  public constructor() {
    this._headers = new AxiosHeaders().setContentType(MIMEType.JSON)
    this._method = HTTPMethod.GET
    this._payload = undefined
    this._responseEncoding = "utf-8"
    this._responseType = HTTPRequestBuilder.DEFAULT_RESPONSE_TYPE
    this._timeout = HTTPRequestBuilder.DEFAULT_TIMEOUT
  }

  public build(): HTTPRequest<I> {
    return new HTTPRequest<I>(this)
  }

  public endpoint(endpoint: URL): HTTPRequestBuilder<I> {
    this._endpoint = endpoint
    return this
  }

  public headers(headers: AxiosRequestHeaders): HTTPRequestBuilder<I> {
    this._headers = headers
    return this
  }

  public method(method: HTTPMethod): HTTPRequestBuilder<I> {
    this._method = method
    return this
  }

  public payload(payload: I | undefined): HTTPRequestBuilder<I> {
    this._payload = payload
    return this
  }

  public responseEncoding(responseEncoding: responseEncoding): HTTPRequestBuilder<I> {
    this._responseEncoding = responseEncoding
    return this
  }

  public responseType(responseType: ResponseType): HTTPRequestBuilder<I> {
    this._responseType = responseType
    return this
  }

  public timeout(milliseconds: number): HTTPRequestBuilder<I> {
    this._timeout = milliseconds
    return this
  }

  public withAuthorization(token: string): HTTPRequestBuilder<I> {
    this._headers = this._headers.setAuthorization(`Bearer ${token}`)
    return this
  }
}

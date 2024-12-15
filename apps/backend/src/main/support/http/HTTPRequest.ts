import { AxiosRequestHeaders, responseEncoding, ResponseType } from "axios"
import { strict as assert } from "node:assert"
import { HTTPMethod } from "./HTTPMethod"
import { HTTPRequestBuilder } from "./HTTPRequestBuilder"
import { EndpointCannotBeUndefinedError } from "../../errors/EndpointCannotBeUndefinedError"
import { TimeoutCannotBeNegativeError } from "../../errors/TimeoutCannotBeNegativeError"

/**
 * @description
 *	Modelo general de un request HTTP.
 */
export class HTTPRequest<I = undefined> {
  private _endpoint: URL
  private _headers: AxiosRequestHeaders
  private _method: HTTPMethod
  private _payload: I | undefined
  private _responseEncoding: responseEncoding
  private _responseType: ResponseType
  private _timeout: number

  public constructor(builder: HTTPRequestBuilder<I>) {
    assert.notEqual(builder._endpoint, undefined, new EndpointCannotBeUndefinedError())
    assert.notEqual(builder._timeout < 0, true, new TimeoutCannotBeNegativeError())
    this._endpoint = builder._endpoint
    this._headers = builder._headers
    this._method = builder._method
    this._payload = builder._payload
    this._responseEncoding = builder._responseEncoding
    this._responseType = builder._responseType
    this._timeout = builder._timeout
  }

  public get endpoint(): URL {
    return this._endpoint
  }

  public get headers(): AxiosRequestHeaders {
    return this._headers
  }

  public get method(): HTTPMethod {
    return this._method
  }

  public get payload(): I | undefined {
    return this._payload
  }

  public get responseEncoding(): responseEncoding {
    return this._responseEncoding
  }

  public get responseType(): ResponseType {
    return this._responseType
  }

  public get timeout(): number {
    return this._timeout
  }
}

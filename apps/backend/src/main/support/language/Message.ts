import { HTTPRequest } from "../http/HTTPRequest"

/**
 * @description
 *    Mensajes globales la aplicación.
 */
export class Message {
  public static readonly ACTIVE_SCOPE = (scope: string) => `The active scope is: '${scope}'.`

  public static readonly CANNOT_DECODE_SECRET_AS_OBJECT = "The secret is binary, and cannot be decoded as an object."

  public static readonly ENDPOINT_CANNOT_BE_UNDEFINED = "The endpoint cannot be undefined."

  public static readonly NON_BINARY_SECRET = "The secret is not binary, and cannot be base64-decoded."

  public static readonly REQUEST = <I>(request: HTTPRequest<I>) =>
    `${request.method} ${request.endpoint.pathname}${request.endpoint.search}`

  public static readonly SHALL_NOT_INSTANTIATE = "You shall not instantiate this class."

  public static readonly TIMEOUT_CANNOT_BE_NEGATIVE = "The timeout cannot be negative."

  public static readonly UNKNOW_ERROR = "An unknown error has occurred."

  private constructor() {
    throw new Error(Message.SHALL_NOT_INSTANTIATE)
  }
}

import axios, { AxiosResponse } from "axios"
import { HTTPRequest } from "../../support/http/HTTPRequest"
import { Service } from "../../support/decorator/Service"
import { Logger } from "../../support/language/Logger"
import { LoggingService } from "./LogginService"

/**
 * @description
 *	The main HTTP/S client.
 *
 * @see https://axios-http.com/docs/intro
 */

@Service()
export class HTTPService {
  private readonly logger: Logger

  public constructor(private readonly loggingService: LoggingService) {
    this.logger = this.loggingService.getLogger("HTTPService")
  }

  /**
   * @description
   *	Envía un request HTTP/S de forma asincrónica.
   * @param request
   *	El request, quien contiene toda la información requerida para golpear
   *	el API del servidor destino.
   * @returns
   *	Un objeto que encapsula la respuesta obtenida.
   *
   * @todo
   *	Return an HTTPResponse instead of an Axios object.
   */
  public async requestAsync<I, O>(request: HTTPRequest<I>): Promise<AxiosResponse<O, I>> {
    this.logger.info(`${request.method} ${request.endpoint.pathname}${request.endpoint.search}`)
    return axios.request<O, AxiosResponse<O, I>, I>({
      data: request.payload,
      decompress: true,
      headers: request.headers,
      method: `${request.method}`.toLowerCase(),
      responseEncoding: request.responseEncoding,
      responseType: request.responseType,
      timeout: request.timeout,
      url: request.endpoint.href
    })
  }
}

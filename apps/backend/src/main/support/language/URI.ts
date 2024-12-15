import { ShallNotInstantiateError } from "../../errors/ShallNotInstantiateError"
import { ApplicationProtocol } from "../http/ApplicationProtocol"

export class URI {
  private constructor() {
    throw new ShallNotInstantiateError()
  }

  public static from(hostname: string, path: string, port: number, protocol: ApplicationProtocol): URL {
    return new URL(`${protocol}://${hostname}:${port}/${path}`)
  }
}

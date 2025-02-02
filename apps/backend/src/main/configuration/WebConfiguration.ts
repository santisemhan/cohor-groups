import { strict as assert } from "node:assert"
import { OriginSpecifiedError } from "../errors/OriginSpecifiedError"

/**
 * @description
 *	Configuración web para servir el API de los frontends.
 */
export class WebConfiguration {
  /** @description Orígenes válidos para la póliza de CORS. */
  public readonly origins: string[]

  /** @description URI en la que se hostea el backend. */
  public readonly source: string

  public constructor(configuration: WebConfiguration) {
    assert.equal(0 < configuration.origins.length, true, new OriginSpecifiedError())
    this.origins = configuration.origins
    this.source = configuration.source
  }
}

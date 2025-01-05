import { strict as assert } from "node:assert"

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
    assert.equal(0 < configuration.origins.length, true, new Error("Must be at least 1 origin specified."))
    this.origins = configuration.origins
    this.source = configuration.source
  }
}

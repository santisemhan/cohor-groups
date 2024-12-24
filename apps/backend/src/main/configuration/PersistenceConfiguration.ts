import { Prisma } from "@prisma/client"

/**
 * @description
 *	Configuración de la capa de persistencia de la aplicación.
 */
export class PersistenceConfiguration {
  /** @description Nombre de la base de datos. */
  public readonly database: string

  /** @description Motor de la instancia de base de datos. */
  public readonly engine: string

  /** @description Formato de errores reportados. */
  public readonly errorFormat: Prisma.ErrorFormat

  /** @description Hostname de la instancia de base de datos. */
  public readonly hostname: string

  /** @description Indica si se deben loguear las consultas emitidas. */
  public readonly log: boolean

  /** @description Contraseña del usuario. */
  public readonly password: string

  /** @description Puerto de conexión. */
  public readonly port: number

  /** @description Zona horaria utilizada en cada conexión. */
  public readonly timezone: string

  /** @description Nombre de usuario. */
  public readonly username: string

  public constructor(configuration: Omit<PersistenceConfiguration, "connectionString">) {
    this.database = configuration.database
    this.engine = configuration.engine
    this.errorFormat = configuration.errorFormat
    this.hostname = configuration.hostname
    this.log = configuration.log
    this.password = configuration.password
    this.port = configuration.port
    this.timezone = configuration.timezone
    this.username = configuration.username
  }

  /**
   * @description
   *  Computa el string de conexión hacia la base de datos según la
   *  configuración actual.
   */
  public connectionString(): string {
    return `${this.engine}://${this.username}:${encodeURIComponent(this.password)}@${this.hostname}:${
      this.port
    }/${this.database}`
  }
}

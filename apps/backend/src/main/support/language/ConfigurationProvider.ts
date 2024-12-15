import { LoggingService } from "../../services/common/LogginService"
import { TimeService } from "../../services/common/TimeService"
import { Logger } from "./Logger"

/**
 * @description
 *  Abstracción de un proveedor de configuración. Se encarga de gestionar la
 *  expiración y actualización de cierta configuración, lo que permite
 *  desencadenar una secuencia de expiraciones y actualizaciones de manera
 *  lazy. El objeto resultante (y todos los objetos intermedios, suponiendo
 *  que todos sean provistos mediante un proveedor adecuado), se retiene en la
 *  caché durante el tiempo de validez, garantizando que las sucesivas
 *  ejecuciones eviten recomputar todos los parámetros asociados.
 */
export abstract class ConfigurationProvider<T> {
  /**
   * @description
   *  Tiempo máximo en microsegundos durante el cual la configuración provista
   *  es válida (i.e., no ha expirado), por defecto (actualmente definido en 5
   *  minutos).
   */
  public static DEFAULT_VALIDITY_IN_MICROSECONDS: number = 5 * 60 * 1000000

  protected expirationTimestamp: Date

  protected lastConfiguration: T | undefined

  protected readonly logger: Logger

  protected validityInMicroseconds: number

  public constructor(
    protected readonly name: string,
    protected readonly loggingService: LoggingService,
    protected readonly timeService: TimeService
  ) {
    this.expirationTimestamp = timeService.now()
    this.lastConfiguration = undefined
    this.logger = loggingService.getLogger(this.name)
    this.timeService = timeService
    this.validityInMicroseconds = ConfigurationProvider.DEFAULT_VALIDITY_IN_MICROSECONDS
  }

  /**
   * @description
   *  Actualiza la configuración y emite un objeto con el resultado de la
   *  misma, la cual será válida hasta que se alcance la siguiente marca de
   *  expiración.
   *
   *  Nótese que este método bien podría modificar el tiempo máximo de
   *  validez de la configuración, en cuyo caso, el mismo se hará efectivo
   *  inmediatamente. Por ejemplo, si la validez es de 1 hora, entonces
   *  durante la reconfiguración podría establecerse un nuevo período de 6
   *  minutos, con lo cual, las próximas actualizaciones ocurrirán con mayor
   *  frecuencia (10 veces por hora, en ese caso).
   */
  protected abstract configureAsync(): Promise<T>

  /**
   * @description
   *  Computa la configuración actualizada en caso de que haya expirado, o
   *  retorna la configuración actual si la misma continúa siendo válida.
   *
   *  Si la configuración del proveedor no ha expirado al momento de
   *  ejecutar este método, entonces no se verificará el estado de
   *  expiración de aquellas configuraciones de las cuáles esta depende,
   *  incluso si las mismas tienen un ciclo de expiración más frecuente.
   */
  public async getConfigurationAsync(): Promise<T> {
    if (!this.lastConfiguration || this.isExpirated()) {
      this.lastConfiguration = await this.configureAsync()
      /*
       * El cómputo de la marca de expiración debe ejecutarse en este
       * instante, luego de realizar la configuración, o de otro modo
       * podría no reflejar las actualizaciones del período de validez.
       */
      this.expirationTimestamp = this.timeService.shiftNowByMicroseconds(this.validityInMicroseconds)
      this.logger.info(
        `Refreshing configuration. New expiration at ${this.timeService.asString(this.expirationTimestamp)}.`
      )
    }
    return this.lastConfiguration
  }

  /**
   * @description
   *  Indica si la configuración actual se encuentra en estado de
   *  expiración, y por ende, debe recomputarse por completo.
   */
  public isExpirated(): boolean {
    return this.timeService.isExpired(this.expirationTimestamp)
  }
}

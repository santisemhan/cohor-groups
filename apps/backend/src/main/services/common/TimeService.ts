import { Injectable } from "../../support/decorator/Injectable"

/**
 * @description
 *  Mecanismos de gestión de la dimensión del tiempo. En general, y a lo largo
 *  de toda la aplicación, se espera que se haga uso prioritariamente de
 *  objetos "aware" y no "naïve", según la definición de Python para la
 *  librería "datetime". Ver enlace adjunto.
 *
 *  En todos los casos, se fuerza una traducción hacia UTC-0 para normalizar
 *  los instantes de tiempo manipulados, y garantizar que todos los desfases
 *  son explícitos hacia dicha zona.
 *
 *  @see https://docs.python.org/3.9/library/datetime.html#aware-and-naive-objects
 *  @see https://www.epochconverter.com/
 */
@Injectable()
export class TimeService {
  /**
   * @description
   *  Análogo a {@link TimeService.asString()}, pero considerando únicamente
   *  la fecha.
   */
  public asDateString(timestamp: Date): string {
    return this.asDateTimeString(timestamp).replace(/T.+$/, "")
  }

  /**
   * @description
   *  Análogo a {@link TimeService.asString()}, pero considerando únicamente
   *  la hora y la fecha, ajustada a UTC-0, con lo cual la zona horaria se
   *  representa por el sufijo "Z".
   */
  public asDateTimeString(timestamp: Date): string {
    return timestamp.toISOString()
  }

  /**
   * @description
   *  Retorna la representación textual del instante, el cual posee el formato
   *  ISO 8601, ubicado en UTC-0:
   *
   *  "2023-01-01T00:00:00.000000+00:00"
   */
  public asString(timestamp: Date): string {
    return timestamp.toISOString().replace("Z", "000+00:00")
  }

  /**
   * @description
   *  Anáogo a {@link TimeService.asString()}, pero procesando una fecha
   *  segregada en año, mes y día, la cual se asume se encuentra en UTC-0 a
   *  las 00:00:00.
   */
  public asStringFromDateParts(year: number, month: number, day: number): string {
    const dayPart = `${day}`.padStart(2, "0")
    const monthPart = `${month}`.padStart(2, "0")
    const yearPart = `${year}`.padStart(4, "0")
    return this.asString(this.fromString(`${yearPart}-${monthPart}-${dayPart}T00:00:00Z`))
  }

  /**
   * @description
   *  Instante definido como "epoch", el cual coincide con la definición de
   *  UNIX, y se corresponde con el instante "1970-01-01T00:00:00.000000+00:00".
   */
  public epoch(): Date {
    return new Date(0)
  }

  /**
   * @description
   *  Obtiene un timestamp desde una cadena en formato ISO 8601, tal cual fue
   *  producida por el método {@link TimeService.asString()}. El instante se
   *  retorna desplazado hacia UTC-0 en todos los casos.
   */
  public fromString(timestamp: string): Date {
    return new Date(Date.parse(timestamp))
  }

  /**
   * @description
   *  Indica si el entorno actual en el que se ejecuta esta aplicación, se
   *  encuentra configurado en la zona horaria UTC-0.
   */
  public inUTC(): boolean {
    return this.offsetInMinutes() === 0
  }

  /**
   * @description
   *  Indica si el instante de tiempo especificado está expirado, es decir, si
   *  es anterior al momento actual.
   */
  public isExpired(timestamp: Date): boolean {
    return timestamp.getTime() <= this.now().getTime()
  }

  /**
   * @description
   *  El instante actual, representado bajo la zona horaria estándar UTC-0 con
   *  respecto al instante definido como "epoch".
   */
  public now(): Date {
    return new Date()
  }

  /**
   * @description
   *  Retorna la representación textual del instante actual, tal cual lo emite
   *  el método {@link TimeService.asString()}.
   */
  public nowAsString(): string {
    return this.asString(this.now())
  }

  /**
   * @description
   *  Desplazamiento actual con respecto a UTC-0 en minutos. Por ejemplo, si
   *  la aplicación se encuentra en la zona UTC-3, entonces este método
   *  retorna 180 minutos. Si la aplicación se encuentra en UTC+5, retorna
   *  -300 minutos (negativo).
   *
   *  En definitiva, si X representa un instante de tiempo en la zona horaria
   *  local, la operación X + {@link offsetInMinutes()} emite el mismo
   *  instante desplazado hacia UTC-0.
   */
  public offsetInMinutes(): number {
    return this.now().getTimezoneOffset()
  }

  /**
   * @description
   *  La cantidad de segundos desde el 1° de Enero de 1970 a las 00:00:00, en
   *  UTC-0 (es decir, desde el instante definido en formato ISO 8601 como
   *  "1970-01-01T00:00:00.000000+00:00"), lo que es equivalente al instante
   *  de tiempo que UNIX define como "epoch". No confundirse con el evento
   *  "epoch" en diferentes sistemas/librerías, ya que el tiempo base ocurre
   *  en otros momentos históricos (e.g., otros sistemas consideran que
   *  "epoch" se define en el año 1900; 70 años antes que UNIX).
   */
  public secondsSinceUNIXEpoch(): number {
    const seconds = this.now().getTime() / 1000
    if (0 <= seconds) {
      return Math.floor(seconds)
    }

    return Math.ceil(seconds)
  }

  /**
   * @description
   *  Aplica un desplazamiento en microsegundos sobre el instante
   *  especificado.
   *
   *  Nótese que si bien el desplazamiento se especifica en microsegundos, el
   *  reloj interno podría manipular una precisión inferior (usualmente en
   *  milisegundos), por lo cual, la siguiente desigualdad podría no ser
   *  cierta:
   *
   *  shiftByMicroseconds(timestamp, µs).getTime() ≠ timestamp.getTime()
   *
   * @see https://mothereff.in/js-variables#%C2%B5s
   */
  public shiftByMicroseconds(timestamp: Date, µs: number): Date {
    return new Date(timestamp.getTime() + µs / 1000)
  }

  /**
   * @description
   *  Análogo al método {@link TimeService.shiftByMicroseconds()},
   *  pero sobre el instante actual.
   */
  public shiftNowByMicroseconds(µs: number): Date {
    return this.shiftByMicroseconds(this.now(), µs)
  }
}

import { TimeService } from "../../services/common/TimeService"
import { Console } from "./Console"
import { LoggingLevel, toShortString } from "./LogginLevel"

/**
 * @description
 *  Un logger inmutable con diferentes niveles de detalle.
 */
export class Logger {
  public constructor(
    private readonly name: string,
    private readonly level: LoggingLevel,
    private readonly timeService: TimeService
  ) {}

  public debug(...messages: unknown[]): void {
    this.log(console.debug, LoggingLevel.DEBUGGING, "#1187fe", "black", ...messages)
  }

  public critical(...messages: unknown[]): void {
    this.log(console.error, LoggingLevel.CRITICAL, "#77ff33", "black", ...messages)
  }

  public error(...messages: unknown[]): void {
    this.log(console.error, LoggingLevel.ERROR, "#de0000", "black", ...messages)
  }

  public info(...messages: unknown[]): void {
    this.log(console.info, LoggingLevel.INFORMATION, "#f3f3f3", "black", ...messages)
  }

  /**
   * @description
   *  El nivel de logging actual para este logger.
   */
  public loggingLevel(): LoggingLevel {
    return this.level
  }

  public warn(...messages: unknown[]): void {
    this.log(console.warn, LoggingLevel.WARNING, "#ffd100", "black", ...messages)
  }

  /**
   * @description
   *  Método genérico de bajo nivel de logging. Muestra un mensaje, con el
   *  'timestamp' actual en formato ISO-8601 simplificado extendido, el nivel
   *  de logging y el nombre del logger, utilizando la consola especificada.
   *  Si un mensaje es de tipo función, entonces se evalúa en caso de ser
   *  necesario, y su resultado se imprime en la consola, lo que permite
   *  evaluar de forma lazy los mensajes más complejos o extensos.
   *
   * @param console
   *  Consola utilizada para imprimir en pantalla (e.g., 'console.log').
   * @param level
   *  El nivel de logging. Si el nivel de logging es inferior al nivel
   *  establecido para el entorno actual, el mensaje es descartado.
   * @param color
   *  El color de la fuente del mensaje de encabezado.
   * @param background
   *  El color del fondo del mensaje de encabezado.
   * @param messages
   *  Los mensajes a imprimir en la consola especificada.
   */
  private log(console: Console, level: LoggingLevel, color: string, background: string, ...messages: unknown[]): void {
    if (this.level <= level) {
      const resolvedMessages = messages.map((message) => {
        if (typeof message === "function") {
          return message()
        }
        return message
      })
      console(
        `%c[${this.timeService.nowAsString()}][${toShortString(level)}][${this.name}]`,
        `color: ${color}; background-color: ${background}`,
        ...resolvedMessages
      )
    }
  }
}

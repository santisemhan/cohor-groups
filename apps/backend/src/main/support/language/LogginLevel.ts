/**
 * @description
 *  Nivel de detalle del logger (el orden es relevante).
 */
export enum LoggingLevel {
  ALL = 0,
  DEBUGGING = 10,
  INFORMATION = 20,
  WARNING = 30,
  ERROR = 40,
  CRITICAL = 50
}

export const toShortString = (loggingLevel: LoggingLevel): string => {
  switch (loggingLevel) {
    case LoggingLevel.ALL:
      return "ALL  "
    case LoggingLevel.DEBUGGING:
      return "DEBUG"
    case LoggingLevel.INFORMATION:
      return "INFO "
    case LoggingLevel.WARNING:
      return "WARN "
    case LoggingLevel.ERROR:
      return "ERROR"
    default:
      return "FATAL"
  }
}

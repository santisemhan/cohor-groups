import { format } from "sql-formatter"
import { Message } from "./Message"

/**
 * @description
 *  Formateador e interpolador de consultas SQL.
 */
export class QueryFormatter {
  private constructor() {
    throw new Error(Message.SHALL_NOT_INSTANTIATE)
  }

  /**
   * @description
   *  Formatea la consulta especificada, interpolando sus parámetros en el
   *  orden hallado.
   */
  public static format(query: string, parameters: unknown[]): string {
    const parameterIndex: { [key: number]: string } = {}
    parameters.forEach((parameter, k) => {
      if (typeof parameter === "string") {
        parameterIndex[k + 1] = `'${parameter}'`
      } else {
        parameterIndex[k + 1] = `${parameter}`
      }
    })
    return format(query, {
      denseOperators: false,
      expressionWidth: 80,
      indentStyle: "standard",
      keywordCase: "upper",
      language: "postgresql",
      linesBetweenQueries: 1,
      logicalOperatorNewline: "before",
      newlineBeforeSemicolon: false,
      params: parameterIndex,
      paramTypes: undefined,
      tabWidth: 4,
      useTabs: false
    })
  }
}

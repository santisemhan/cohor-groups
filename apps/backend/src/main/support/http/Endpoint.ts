import { ShallNotInstantiateError } from "../../errors/ShallNotInstantiateError"

/**
 * @description
 *  Clase de soporte que facilita crear endpoints y normalizarlos.
 */
export class Endpoint {
  private constructor() {
    throw new ShallNotInstantiateError()
  }

  /**
   * @description
   *  Concatena una lista de segmentos agregando o eliminando símbolos '/'
   *  según corresponda, así como también eliminando espacios innecesario en
   *  los extremos.
   * @param segments
   *  Una lista de segmentos de una ruta o endpoint.
   * @returns
   *  Un string conformado por la unión de todos los segmentos normalizados.
   */
  public static absoluteJoin(segments: string[]): string {
    return `/${Endpoint.relativeJoin(segments)}`
  }

  /**
   * @description
   *	Decodifica un segmento de URI, o una URI completa utilizando el
   *	esquema no-estándar de Amazon S3, también conocido como (+)-encoding,
   *	el intercambia los espacios por el símbolo "+", y este último por la
   *	secuencia "%2B". Luego de realizar esta modificación, es posible
   *	aplicar una decodificación de URI normal.
   * @param segment
   *	El segmento o URI completa a decodificar.
   * @returns
   *	El segmento o URI original, antes de haber sido codificado.
   */
  public static decodePlusEncoded(segment: string): string {
    return decodeURIComponent(segment.replace(/\+/g, " "))
  }

  /**
   * @description
   *  Concatena una lista de segmentos agregando o eliminando símbolos '/'
   *  según corresponda, así como también eliminando espacios innecesario en
   *  los extremos.
   * @param segments
   *  Una lista de segmentos de un endpoint.
   * @returns
   *  Una URL conformada con la unión de todos los segmentos normalizados.
   */
  public static join(segments: string[]): URL {
    return new URL(Endpoint.relativeJoin(segments))
  }

  /**
   * @description
   *	Análogo a "absoluteJoin", pero permite componer rutas relativas
   *	(aquellas que no comienzan con "/").
   */
  public static relativeJoin(segments: string[]): string {
    return segments
      .map((segment) => segment.trim())
      .map((segment) => segment.replace(/(^\/+)|(\/+$)/g, ""))
      .join("/")
  }
}

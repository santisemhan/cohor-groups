import { Context } from "aws-lambda"

/**
 * @description
 *	Interfaz general de una función serverless asincrónica.
 * @type E
 *	El tipo de evento que la función puede manipular.
 * @type R
 *	El tipo de retorno de la función.
 */
export interface ServerlessFunction<E = unknown, R = void> {
  runAsync(event: E, context: Context): Promise<R>
}

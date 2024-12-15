import { Context } from "aws-lambda"

/**
 * @description
 *	Representa un tipo que es equivalente a ServerlessFunction<E, R>, pero que
 *	no impone un nombre específico, con lo cual es posible utilizar este tipo
 *	para generar un proxy al llamar a una de estas funciones.
 */
export type ServerlessFunctionDispatcher<E = unknown, R = void> = (event: E, context: Context) => Promise<R>

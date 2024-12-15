/**
 * @description
 *	Interface funcional que representa una función con la misma signature que
 *	los métodos de logging (como "console.log").
 */
export interface Console {
  (message?: unknown, ...optionalParams: unknown[]): void
}

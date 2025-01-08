/**
 * @description
 *	Patrón builder.
 */
export interface Builder<T> {
  /**
   * @description
   *	Construye una instancia del tipo T.
   */
  build(): T
}

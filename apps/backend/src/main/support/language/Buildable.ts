/**
 * @description
 *	Generic build pattern implementation.
 */
export interface Buildable<T> {
  /**
   * @description
   *	Builds a new instance of type T.
   */
  build(): T
}

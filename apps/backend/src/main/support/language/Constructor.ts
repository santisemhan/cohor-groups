/**
 * @description
 *	Tipo que especifica un constructor genérico. Si un objeto es de este
 *	tipo, entonces puede aplicarse un llamado mediante la keyword 'new' al
 *	igual que con un constructor de clase.
 */
export type Constructor<T> = new (...args: unknown[]) => T

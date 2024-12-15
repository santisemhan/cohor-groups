import { Service } from "typedi"

/**
 * @description
 *	Permite inyectar o proveer una clase como dependencia, al igual que
 *	@Service, pero usando un nombre más conveniente en diferentes situaciones.
 */
export function Component<T = unknown>() {
  return Service<T>()
}

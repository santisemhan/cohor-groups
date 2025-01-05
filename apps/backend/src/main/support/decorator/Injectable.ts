import { Service } from "typedi"

export function Injectable<T = unknown>() {
  return Service<T>()
}

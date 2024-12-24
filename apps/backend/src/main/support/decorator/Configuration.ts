import { Service } from "typedi"

export function Configuration<T = unknown>() {
  return Service<T>()
}

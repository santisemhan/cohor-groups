import { Service } from "typedi"

export function Repository<T = unknown>() {
  return Service<T>()
}

import { Service as ServiceType } from "typedi"

export function Service<T = unknown>() {
  return ServiceType<T>()
}

import { Enum } from "../support/language/Enum"

export type FunctionPermissionSpecification = {
  [key: string]: Role[]
}

export enum Role {
  User = "User"
}

export const Permisions: FunctionPermissionSpecification = {
  "GET/protected": [Role.User],
  "PUT/users": [Role.User]
}

export class PermissionSpecification {
  private static readonly permissions: FunctionPermissionSpecification = Permisions

  public static getFunctionPermissionsToString(endpoint: string): string[] {
    return (this.permissions[endpoint] || []).map((role: Role) => Enum.valueFromKey(Role, role))
  }
}

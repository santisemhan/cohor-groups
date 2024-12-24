export class AuthenticationConfiguration {
  public readonly JWTKey: string

  public constructor(configuration: AuthenticationConfiguration) {
    this.JWTKey = configuration.JWTKey
  }
}

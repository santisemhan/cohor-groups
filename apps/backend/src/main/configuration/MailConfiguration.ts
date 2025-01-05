export class MailConfiguration {
  public readonly APIKey: string

  public constructor(configuration: MailConfiguration) {
    this.APIKey = configuration.APIKey
  }
}

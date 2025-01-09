export class StorageConfiguration {
  public readonly cloudName: string

  public readonly apiKey: string

  public readonly apiSecret: string

  public constructor(configuration: StorageConfiguration) {
    this.cloudName = configuration.cloudName
    this.apiKey = configuration.apiKey
    this.apiSecret = configuration.apiSecret
  }
}

import { EnvironmentService } from "../../services/common/EnvironmentService"
import { LoggingService } from "../../services/common/LogginService"
import { TimeService } from "../../services/common/TimeService"
import { Injectable } from "../../support/decorator/Injectable"
import { ConfigurationProvider } from "../../support/language/ConfigurationProvider"
import { StorageConfiguration } from "../StorageConfiguration"

@Injectable()
export class StorageConfigurationProvider extends ConfigurationProvider<StorageConfiguration> {
  public constructor(
    private readonly environmentService: EnvironmentService,
    protected override readonly loggingService: LoggingService,
    protected override readonly timeService: TimeService
  ) {
    super("StorageConfigurationProvider", loggingService, timeService)
  }

  // From secret
  protected override async configureAsync(): Promise<StorageConfiguration> {
    return new StorageConfiguration({
      cloudName: this.environmentService.getStringOrFail("CLOUDINARY_CLOUD_NAME"),
      apiKey: this.environmentService.getStringOrFail("CLOUDINARY_API_KEY"),
      apiSecret: this.environmentService.getStringOrFail("CLOUDINARY_API_SECRET")
    })
  }
}

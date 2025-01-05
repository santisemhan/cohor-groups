import { EnvironmentService } from "../../services/common/EnvironmentService"
import { LoggingService } from "../../services/common/LogginService"
import { TimeService } from "../../services/common/TimeService"
import { Injectable } from "../../support/decorator/Injectable"
import { ConfigurationProvider } from "../../support/language/ConfigurationProvider"
import { WebConfiguration } from "../WebConfiguration"

/**
 * @description
 *	Proveedor de configuración para la capa web.
 */
@Injectable()
export class WebConfigurationProvider extends ConfigurationProvider<WebConfiguration> {
  public constructor(
    private readonly environmentService: EnvironmentService,
    protected override readonly loggingService: LoggingService,
    protected override readonly timeService: TimeService
  ) {
    super("WebConfigurationProvider", loggingService, timeService)
  }

  protected override async configureAsync(): Promise<WebConfiguration> {
    return new WebConfiguration({
      origins: this.environmentService.getStringOrFail("COHOR_APPLICATION_FRONTEND_ORIGINS").split(","),
      source: this.environmentService.getStringOrFail("COHOR_API_GATEWAY_ENDPOINT_URI")
    })
  }
}

import { ConfigurationProvider } from "../../support/language/ConfigurationProvider"
import { EnvironmentService } from "../../services/common/EnvironmentService"
import { LoggingService } from "../../services/common/LogginService"
import { TimeService } from "../../services/common/TimeService"
import { Injectable } from "../../support/decorator/Injectable"
import { MailConfiguration } from "../MailConfiguration"

/**
 * @description
 *Proveedor de configuraciÃ³n para la capa de persistencia.
 */
@Injectable()
export class MailConfigurationProvider extends ConfigurationProvider<MailConfiguration> {
  public constructor(
    private readonly environmentService: EnvironmentService,
    protected override readonly loggingService: LoggingService,
    protected override readonly timeService: TimeService
  ) {
    super("MailConfigurationProvider", loggingService, timeService)
  }

  // La informacion deberia venir del secret si es un ambiente de produccion o QA
  protected override async configureAsync(): Promise<MailConfiguration> {
    return new MailConfiguration({
      APIKey: this.environmentService.getStringOrFail("RESEND_API_KEY")
    })
  }
}

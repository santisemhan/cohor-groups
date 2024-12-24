import { Prisma } from "@prisma/client"

import { Configuration } from "../../support/decorator/Configuration"
import { ConfigurationProvider } from "../../support/language/ConfigurationProvider"
import { PersistenceConfiguration } from "../PersistenceConfiguration"
import { EnvironmentService } from "../../services/common/EnvironmentService"
import { LoggingService } from "../../services/common/LogginService"
import { TimeService } from "../../services/common/TimeService"

/**
 * @description
 *Proveedor de configuraciÃ³n para la capa de persistencia.
 */
@Configuration()
export class PersistenceConfigurationProvider extends ConfigurationProvider<PersistenceConfiguration> {
  public constructor(
    private readonly environmentService: EnvironmentService,
    protected override readonly loggingService: LoggingService,
    protected override readonly timeService: TimeService
  ) {
    super("PersistenceConfigurationProvider", loggingService, timeService)
  }

  protected override async configureAsync(): Promise<PersistenceConfiguration> {
    return new PersistenceConfiguration({
      database: this.environmentService.getStringOrDefault("INTEGRATOR_DATASOURCE_DATABASE", "Integrator"),
      engine: this.environmentService.getStringOrDefault("INTEGRATOR_DATASOURCE_ENGINE", "postgresql"),
      errorFormat:
        (this.environmentService.getStringOrDefault("PRISMA_CLIENT_ERROR_FORMAT", "pretty") as Prisma.ErrorFormat) ||
        "pretty",
      hostname: this.environmentService.getStringOrDefault("INTEGRATOR_DATASOURCE_HOSTNAME", "localhost"),
      log: this.environmentService.getBooleanOrDefault("INTEGRATOR_DATASOURCE_LOG", true),
      password: this.environmentService.getStringOrDefault("INTEGRATOR_DATASOURCE_PASSWORD", "<password>"),
      port: +this.environmentService.getNumberOrDefault("INTEGRATOR_DATASOURCE_PORT", 5432),
      timezone: this.environmentService.getStringOrDefault("INTEGRATOR_DATASOURCE_TIMEZONE", "+00:00"),
      username: this.environmentService.getStringOrDefault("INTEGRATOR_DATASOURCE_USERNAME", "integrator")
    })
  }
}

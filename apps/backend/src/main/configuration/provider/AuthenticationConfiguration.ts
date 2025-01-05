import { ConfigurationProvider } from "../../support/language/ConfigurationProvider"
import { EnvironmentService } from "../../services/common/EnvironmentService"
import { LoggingService } from "../../services/common/LogginService"
import { TimeService } from "../../services/common/TimeService"
import { Injectable } from "../../support/decorator/Injectable"
import { AuthenticationConfiguration } from "../AuthenticationConfiguration"

/**
 * @description
 *Proveedor de configuraciÃ³n para la capa de persistencia.
 */
@Injectable()
export class AuthenticationConfigurationProvider extends ConfigurationProvider<AuthenticationConfiguration> {
  public constructor(
    private readonly environmentService: EnvironmentService,
    protected override readonly loggingService: LoggingService,
    protected override readonly timeService: TimeService
  ) {
    super("AuthenticationConfigurationProvider", loggingService, timeService)
  }

  // La informacion deberia venir del secret si es un ambiente de produccion o QA
  protected override async configureAsync(): Promise<AuthenticationConfiguration> {
    return new AuthenticationConfiguration({
      JWTKey: this.environmentService.getStringOrDefault(
        "JWT_SECRET",
        "59484184476c7ba997fc6653f7d19ad40e022e1e619d4e4a686d663db5b121b4891f9e0b3d246abbf7a4baaa1457fd43bc7a5ed5fd3a92f70cfb309208e2ad8a7e068ed8f52a932f522f5637ffba7cbed65a8ee06896ed1231a85130120f4d0374d5ae735b8f8dcf3875e3f8a45b8b9cdef53c084dd1254986912aef33f3572ca85b49e87340fe6e6c11c417aefd061d1b7c0bebb1069b69a338ed039f6c4c7c2c3f7aa4d6b6f920fc4ddcf082fef8915b6aaeb489470d5fac99a0d8ee94e52b544aae083d34c9a4d333ce13c1cacece63a8205cc5e8203cd5ccbf5ba80250ea44181abee7267c3b5308a085a633f084dd0361e0c34e26c59a8959bcdfe6f422"
      )
    })
  }
}

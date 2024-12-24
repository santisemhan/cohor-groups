import { TimeService } from "./TimeService"
import { LoggingLevel } from "../../support/language/LogginLevel"
import { Logger } from "../../support/language/Logger"
import { EnvironmentService } from "./EnvironmentService"
import { Injectable } from "../../support/decorator/Injectable"

@Injectable()
export class LoggingService {
  public constructor(
    private readonly environmentService: EnvironmentService,
    private readonly timeService: TimeService
  ) {}

  /**
   * @description
   *  Gets the current logging-level set for the application.
   */
  public loggingLevel(): LoggingLevel {
    return this.environmentService.getEnumFromKeyOrDefault(LoggingLevel, "LOGGING_LEVEL", LoggingLevel.INFORMATION)
  }

  public getLogger(name: string) {
    const loggingLevel = this.loggingLevel()
    return new Logger(name, loggingLevel, this.timeService)
  }
}

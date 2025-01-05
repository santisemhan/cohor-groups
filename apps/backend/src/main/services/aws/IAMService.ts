import { PolicyDocument, Statement } from "aws-lambda"

import { Injectable } from "../../support/decorator/Injectable"
import { LoggingService } from "../common/LogginService"
import { Logger } from "../../support/language/Logger"

@Injectable()
export class IAMService {
  private static readonly POLICY_VERSION = "2012-10-17"

  private readonly logger: Logger

  public constructor(private readonly loggingService: LoggingService) {
    this.logger = this.loggingService.getLogger("IAMService")
  }

  public generatePolicy(statements: Statement[]): PolicyDocument {
    const policy: PolicyDocument = {
      Version: IAMService.POLICY_VERSION,
      Statement: statements
    }
    return policy
  }
}

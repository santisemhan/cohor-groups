import { Prisma, PrismaClient } from "@prisma/client"
import { Logger } from "../../support/language/Logger"
import { LoggingService } from "../common/LogginService"
import { PersistenceConfigurationProvider } from "../../configuration/provider/PersistenceConfigurationProvider"
import { QueryFormatter } from "../../support/language/QueryFormatter"
import { Injectable } from "../../support/decorator/Injectable"

/**
 * @description
 *  Servicio principal de acceso a la base de datos.
 *
 * @todo
 *  Analizar la forma en la que se gestiona el pool de conexiones en un
 *  entorno serverless, tanto para el cliente Prisma como para el driver de
 *  PostgreSQL (pg).
 *
 * @see https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
 * @see https://node-postgres.com/features/pooling
 */
@Injectable()
export class DatabaseService {
  private readonly logger: Logger

  private prismaClient: PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> | undefined

  constructor(
    private readonly loggingService: LoggingService,
    private readonly persistenceConfigurationProvider: PersistenceConfigurationProvider
  ) {
    this.prismaClient = undefined
    this.logger = this.loggingService.getLogger("DatabaseService")
  }

  /**
   * @description
   *  Obtener una conexión hacia la base de datos relacional principal.
   */
  public async connectionAsync(): Promise<PrismaClient> {
    if (!this.prismaClient) {
      const configuration = await this.persistenceConfigurationProvider.getConfigurationAsync()
      // Prisma ORM needs this in the environment to work.
      process.env.MAIN_DATASOURCE_URI = configuration.connectionString()
      this.prismaClient = new PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>({
        errorFormat: configuration.errorFormat,
        log: [
          { emit: "event", level: "error" },
          { emit: "event", level: "info" },
          { emit: "event", level: "query" },
          { emit: "event", level: "warn" }
        ]
      })
      this.prismaClient.$on("error", (event) => this.logger.error(`[${event.target}] ${event.message}`))
      this.prismaClient.$on("info", (event) => this.logger.info(`[${event.target}] ${event.message}`))
      this.prismaClient.$on("query", (event) => {
        const query = QueryFormatter.format(event.query, JSON.parse(event.params) as unknown[])
        this.logger.info(`[${event.target}] Runned in ${event.duration} ms.:`, () => `\n${query}`)
      })
      this.prismaClient.$on("warn", (event) => this.logger.warn(`[${event.target}] ${event.message}`))
      this.logger.info(`Connected to database instance on: ${configuration.hostname}`)
    }
    return this.prismaClient
  }
}

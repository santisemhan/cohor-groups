import { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { MIMEType } from "../../support/http/MIMEType"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { Injectable } from "../../support/decorator/Injectable"

@Injectable()
export class ValidationAccountSuccessfullyFunction extends APIServerlessFunction {
  constructor() {
    super()
  }

  public override async handleAsync(_event: APIGatewayProxyEventV2, _context: Context) {
    // Pasar a un sitio web estatico junto con la landing para cachearlo y que no gaste llamadas de la API/Lambda
    return new HTTPResponse(MIMEType.JSON).header("Content-Type", "text/html").statusCode(HTTPStatusCode.Ok).body(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Cohor | Validación Exitosa</title>
            </head>
            <body><h1>La verificación ha sido exitosa, vuelve a la aplicacion para iniciar sesión!</h1></body>
            </html>
        `)
  }
}

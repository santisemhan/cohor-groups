import { APIGatewayProxyEventV2, APIGatewayProxyWithLambdaAuthorizerEvent, Context } from "aws-lambda"
import { HTTPResponse } from "../../support/http/HTTPResponse"
import { HTTPStatusCode } from "../../support/http/HTTPStatusCode"
import { MIMEType } from "../../support/http/MIMEType"
import { APIServerlessFunction } from "../../support/serverless/ApiServerlessFunction"
import { Injectable } from "../../support/decorator/Injectable"
import { CategoryService } from "../../services/CategoryService"

@Injectable()
export class GetCategoriesFunction extends APIServerlessFunction {
  constructor(private readonly categoryService: CategoryService) {
    super()
  }

  public override async handleAsync(_event: APIGatewayProxyEventV2, _context: Context) {
    const categories = await this.categoryService.getAllAsync()
    return new HTTPResponse(MIMEType.JSON).body(categories).statusCode(HTTPStatusCode.Ok)
  }
}

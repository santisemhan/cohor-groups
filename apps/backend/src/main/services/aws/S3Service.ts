import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Injectable } from "../../support/decorator/Injectable"
import { EnvironmentService } from "../common/EnvironmentService"

/**
 
@description
Servicio de acceso a Amazon S3 (Simple Storage Service).
Utilizando el SDK v3 de AWS.*
@see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/*/

@Injectable()
export class S3Service {
  public static readonly DEFAULT_PRESIGNED_EXPIRATION_IN_SECONDS = 3600

  private static readonly S3_API_VERSION = "2006-03-01"

  private readonly client: S3Client

  public constructor(private readonly environmentService: EnvironmentService) {
    this.client = new S3Client({
      apiVersion: S3Service.S3_API_VERSION,
      region: this.environmentService.getStringOrFail("AWS_REGION")
    })
  }

  public async putPresignedUrlAsync(bucketName: string, objectKey: string) {
    const command = new PutObjectCommand({ Bucket: bucketName, Key: objectKey })
    return getSignedUrl(this.client, command, {
      expiresIn: S3Service.DEFAULT_PRESIGNED_EXPIRATION_IN_SECONDS
    })
  }
}

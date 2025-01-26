import { v2 as cloudinary } from "cloudinary"
import { Injectable } from "../../support/decorator/Injectable"
import { StorageConfigurationProvider } from "../../configuration/provider/StorageConfiguration"

@Injectable()
export class CloudinaryService {
  private client: typeof cloudinary | undefined

  public constructor(private readonly storageConfigurationProvider: StorageConfigurationProvider) {
    this.client = undefined
  }

  private async getClientAsync() {
    if (this.client === undefined) {
      const configuration = await this.storageConfigurationProvider.getConfigurationAsync()
      cloudinary.config({
        cloud_name: configuration.cloudName,
        api_key: configuration.apiKey,
        api_secret: configuration.apiSecret
      })
      this.client = cloudinary
    }
    return this.client
  }

  /**
    @see https://cloudinary.com/documentation/authentication_signatures
  **/
  public async putPresignedUrlAsync(folder: string, fileName: string) {
    const configuration = await this.storageConfigurationProvider.getConfigurationAsync()

    // Signatures are valid for one hour from the timestamp value used to generate the signature.
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder, public_id: fileName },
      configuration.apiSecret
    )
    return { signature, timestamp }
  }
}

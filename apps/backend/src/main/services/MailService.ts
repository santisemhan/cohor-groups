import { MailConfigurationProvider } from "../configuration/provider/MailConfigurationProvider"
import { CannotSendEmail } from "../errors/CannotSendEmail"
import { Injectable } from "../support/decorator/Injectable"
import { Resend, ErrorResponse } from "resend"

@Injectable()
export class MailService {
  private client: undefined | Resend

  constructor(private readonly mailConfigurationProvider: MailConfigurationProvider) {
    this.client = undefined
  }

  private async getClientAsync() {
    const configuration = await this.mailConfigurationProvider.getConfigurationAsync()
    if (!this.client) {
      this.client = new Resend(configuration.APIKey)
    }
    return this.client
  }

  public async sendMail(data: { to: string; subject: string; body: string; from?: string }): Promise<void> {
    const { to, subject, body, from } = data
    try {
      const client = await this.getClientAsync()
      const emailFrom = from || "Cohor <no-reply@notify.cohor.app>"
      await client.emails.send({
        from: emailFrom,
        to,
        subject,
        html: body
      })
    } catch (error) {
      throw new CannotSendEmail(error as ErrorResponse)
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_KEY);

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.resend.emails.send({
        from: 'Test <test@test.dev>',
        to: [to],
        subject: subject,
        html: text,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_KEY);

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['wilmervzla2000@gmail.com'],
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmailConfirmation(email: string, code: string, emailHtml?: string): Promise<void> {
    const mailOptions = {
      from: '"Vibee" <no-reply@vibee.com>',
      to: email,
      subject: 'Confirmação de E-mail - Vibee',
      text: `Seu código de confirmação é: ${code}`,
      html: `<p>Olá,</p>
             <p>Seu código de confirmação é: <strong>${code}</strong></p>
             <p>Insira-o no aplicativo para confirmar seu cadastro.</p>
             <p>Atenciosamente,<br/>Equipe Vibee</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
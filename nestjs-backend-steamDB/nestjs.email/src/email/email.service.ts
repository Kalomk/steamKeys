import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async ownerEmailSend(payload) {
    await this.mailService.sendMail({
      to: payload.email,
      subject: 'Your key is buyed',
      from: 'denkluch8@gmail.com',
      template: 'emailerToOwner',
      context: {
        emailer: payload,
      },
    });
    return 'success';
  }
  async buyerEmailSend(payload) {
    await this.mailService.sendMail({
      to: payload.buyerEmail,
      subject: 'Key buyed',
      from: 'denkluch8@gmail.com',
      template: 'emailerToBuyer',
      context: {
        emailer: payload,
      },
    });
    return 'success';
  }
}

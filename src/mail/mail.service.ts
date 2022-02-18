import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  public sendMail(receiver: string): void {
    this.mailerService
      .sendMail({
        to: receiver,
        from: 'TrelloClone <smittya@ukr.net>',
        subject: 'Welcome to TrelloClone',
        text: `Hi <${receiver}>!\nWe would like to invite you to follow the work we do together through TrelloClone.\nYou can follow the link:\n`,
        html: `Hi ${receiver}!<br>We would like to invite you to follow the work we do together through TrelloClone.<br>You can follow the link:<br>`,
      })
      .then(() => {
      })
      .catch(() => {
      });
  }
}

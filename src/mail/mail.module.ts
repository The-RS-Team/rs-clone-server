import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://smittya@ukr.net:jw069oNKB6bs40W2@smtp.ukr.net',
      defaults: {
        from: '"TrelloClone" <smittya@ukr.net>',
      },
      template: {
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})

export class MailModule {
}



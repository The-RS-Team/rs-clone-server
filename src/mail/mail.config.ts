import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (): Promise<any> => {
  const transport = 'smtps://smittya@ukr.net:jw069oNKB6bs40W2@smtp.ukr.net';
  const mailFromName = 'TrelloClone';
  const mailFromAddress = 'smittya@ukr.net';

  return {
    transport,
    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};


import { ConfigService } from '@nestjs/config';

export const mailConfig = async (config: ConfigService) => ({
  transport: {
    host: config.get<string>('MAIL_HOST'),
    port: config.get<number>('MAIL_PORT'),
    secure: false,
    auth: {
      user: config.get<string>('MAIL_USER'),
      pass: config.get<string>('MAIL_PASS'),
    },
  },
  defaults: {
    from: `"Demo App" <${config.get<string>('MAIL_USER')}>`,
  },
});

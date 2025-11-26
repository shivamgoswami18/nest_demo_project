import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mailConfig } from './mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mailConfig,
      inject: [ConfigService],
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}

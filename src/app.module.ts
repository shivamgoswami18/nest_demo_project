import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { ProductModule } from './product/product.module';
import { ServiceModule } from './service/service.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './libs/service/auth/jwt.strategy';
import { MailModule } from './libs/service/mail/mail.module';

const mongoUri = process.env.MONGO_URI ?? '';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(mongoUri),

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    UploadModule,
    ProductModule,
    ServiceModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

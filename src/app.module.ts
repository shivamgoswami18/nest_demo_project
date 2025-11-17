import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config();

const mongoUri = process.env.MONGO_URI ?? '';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(mongoUri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

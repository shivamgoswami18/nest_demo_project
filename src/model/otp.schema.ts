import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true, collection: 'otp', minimize: false })
export class Otp {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: Number,
    required: true,
  })
  otp: number;

  @Prop({
    type: Date,
    required: true,
  })
  otp_expire: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

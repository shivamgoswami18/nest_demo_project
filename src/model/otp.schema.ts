import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true, collection: 'otp', minimize: false })
export class Otp {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
  })
  otp: string;

  @Prop({
    type: Date,
    required: false,
  })
  otp_expire: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

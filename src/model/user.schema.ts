import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/libs/utility/constants/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'user', minimize: false })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

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
    type: String,
    required: false,
  })
  otpExpire: Date;

  @Prop({
    type: Boolean,
    default: false,
    required: false,
  })
  isOtpVerified: boolean;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    required: true,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

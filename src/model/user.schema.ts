import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'user', minimize: false })
export class User {
  @Prop({
    type: String,
    required: true,
    maxlength: 255,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 255,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    minlength: 6,
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
    min: 1,
    max: 150,
  })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

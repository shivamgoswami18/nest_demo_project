import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema({ timestamps: true, collection: 'member', minimize: true })
export class Member {
  @Prop({
    type: String,
    required: true,
  })
  member_name: string;

  @Prop({
    type: String,
    required: true,
  })
  member_position: string;

  @Prop({
    type: String,
    required: true,
  })
  member_image: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  is_deleted: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

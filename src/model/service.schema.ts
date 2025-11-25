import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({ timestamps: true, collection: 'service', minimize: true })
export class Service {
  @Prop({
    type: String,
    required: true,
  })
  service_name: string;

  @Prop({
    type: String,
    required: true,
  })
  service_description: string;

  @Prop({
    type: Boolean,
    default: false,
    required: true
  })
  is_deleted: boolean

  @Prop({
    type: [
      {
        overview_image: {
          type: String,
          required: true,
        },
        service_image: {
          type: String,
          required: true,
        },
        right_sidebar_image_1: {
          type: String,
          required: true,
        },
        right_sidebar_image_2: {
          type: String,
          required: true,
        },
      },
    ],
  })
  service_images: {
    overview_image: string;
    service_image: string;
    right_sidebar_image_1: string;
    right_sidebar_image_2: string;
  }[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

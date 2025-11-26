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
    required: true,
  })
  is_deleted: boolean;

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

  @Prop({
    type: [
      {
        sub_service_title: {
          type: String,
          required: true,
        },
        sub_service_description: {
          type: String,
          required: true,
        },
      },
    ],
  })
  sub_service: {
    sub_service_title: string;
    sub_service_description: string;
  }[];

  @Prop({
    type: [
      {
        services_details_point: {
          type: String,
          required: true,
        },
      },
    ],
  })
  approaches: {
    services_details_point: string;
  }[];

  @Prop({
    type: [
      {
        services_details_point: {
          type: String,
          required: true,
        },
      },
    ],
  })
  benefits: {
    services_details_point: string;
  }[];

  @Prop({
    type: [
      {
        services_details_point: {
          type: String,
          required: true,
        },
      },
    ],
  })
  atc: {
    services_details_point: string;
  }[];

  @Prop({
    type: [
      {
        services_details_point: {
          type: String,
          required: true,
        },
        services_details_description: {
          type: String,
          required: true,
        },
      },
    ],
  })
  consulting: {
    services_details_point: string;
    services_details_description: string;
  }[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

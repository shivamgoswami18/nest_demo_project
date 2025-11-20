import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, collection: 'product', minimize: false })
export class Product {
  @Prop({
    type: String,
    required: true,
  })
  product_name: string;

  @Prop({
    type: String,
    required: true,
  })
  product_description: string;

  @Prop({
    type: [
      {
        benefit: {
          type: String,
          required: true,
        },
      },
    ],
  })
  product_benefits: {
    benefit: string;
  }[];

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
  productImages: {
    overview_image: string;
    service_image: string;
    right_sidebar_image_1: string;
    right_sidebar_image_2: string;
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

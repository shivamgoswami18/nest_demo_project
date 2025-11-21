import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
class ProductServiceDetail {
  @Prop({
    type: String,
    required: true,
  })
  product_service_detail: string;
}

export const ProductServiceDetailSchema =
  SchemaFactory.createForClass(ProductServiceDetail);

@Schema()
class ProductService {
  @Prop({
    type: String,
    required: true,
  })
  product_service_type: string;

  @Prop({
    type: [ProductServiceDetailSchema],
  })
  product_service_details: ProductServiceDetail[];
}

export const ProductServiceSchema =
  SchemaFactory.createForClass(ProductService);

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
        product_benefit: {
          type: String,
          required: true,
        },
      },
    ],
  })
  product_benefits: {
    product_benefit: string;
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
  product_images: {
    overview_image: string;
    service_image: string;
    right_sidebar_image_1: string;
    right_sidebar_image_2: string;
  }[];

  @Prop({ type: [ProductServiceSchema] })
  product_services: ProductService[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

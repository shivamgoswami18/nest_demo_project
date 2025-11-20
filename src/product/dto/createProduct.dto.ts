import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class ProductBenefitDto {
  @ApiProperty({
    example: 'Improves productivity',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  benefit: string;
}

class ProductImageDto {
  @ApiProperty({
    example: 'image_1',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  overview_image: string;

  @ApiProperty({
    example: 'image_2',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  service_image: string;

  @ApiProperty({
    example: 'image_3',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  right_sidebar_image_1: string;

  @ApiProperty({
    example: 'image_4',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  right_sidebar_image_2: string;
}

export class CreateProductDto {
  @ApiProperty({
    example: 'laptop',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty({
    example: 'we can make websites',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  product_description: string;

  @ApiProperty({
    type: [ProductBenefitDto],
    example: [
      { benefit: 'Improves productivity' },
      { benefit: 'Learn new things' },
    ],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductBenefitDto)
  product_benefits: ProductBenefitDto[];

  @ApiProperty({
    type: [ProductImageDto],
    example: [
      {
        overview_image: 'image_1',
        service_image: 'image_2',
        right_sidebar_image_1: 'image_3',
        right_sidebar_image_2: 'image_4',
      },
    ],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  productImages: ProductImageDto[];
}

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
  product_benefit: string;
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

class ProductServiceDetailDto {
  @ApiProperty({
    example: 'Track carbon emissions',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  product_service_detail: string;
}

class ProductServiceDto {
  @ApiProperty({
    example: 'Record Your Impact',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  product_service_type: string;

  @ApiProperty({
    type: [ProductServiceDetailDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductServiceDetailDto)
  product_service_details: ProductServiceDetailDto[];
}

class ProductExpertiseDto {
  @ApiProperty({
    example: 'Environmental Data Tracking',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  expertise_area: string;

  @ApiProperty({
    example: 'Track emissions, energy usage',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  expertise_description: string;
}

class ProductMethodologyDto {
  @ApiProperty({
    example: 'Assess current environmental impact and sustainability goals.',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  methodology_description: string;
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
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductBenefitDto)
  product_benefits: ProductBenefitDto[];

  @ApiProperty({
    type: [ProductImageDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  product_images: ProductImageDto[];

  @ApiProperty({
    type: [ProductServiceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductServiceDto)
  product_services: ProductServiceDto[];

  @ApiProperty({
    type: [ProductExpertiseDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductExpertiseDto)
  product_expertise: ProductExpertiseDto[];

  @ApiProperty({
    type: [ProductMethodologyDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductMethodologyDto)
  product_methodology: ProductMethodologyDto[];
}

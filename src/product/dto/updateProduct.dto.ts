import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class UpdateProductBenefitDto {
  @ApiProperty({
    example: 'Improves productivity',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  benefit?: string;
}

class UpdateProductImageDto {
  @ApiProperty({
    example: 'image_1',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  overview_image: string;

  @ApiProperty({
    example: 'image_2',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  service_image: string;

  @ApiProperty({
    example: 'image_3',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  right_sidebar_image_1: string;

  @ApiProperty({
    example: 'image_4',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  right_sidebar_image_2: string;
}

export class UpdateProductDto {
  @ApiProperty({
    example: 'laptop',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  product_name?: string;

  @ApiProperty({
    example: 'we can make websites',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  product_description?: string;

  @ApiProperty({
    type: [UpdateProductBenefitDto],
    example: [
      { benefit: 'Improves productivity' },
      { benefit: 'Learn new things' },
    ],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductBenefitDto)
  product_benefits: UpdateProductBenefitDto[];

  @ApiProperty({
    type: [UpdateProductImageDto],
    example: [
      {
        overview_image: 'image_1',
        service_image: 'image_2',
        right_sidebar_image_1: 'image_3',
        right_sidebar_image_2: 'image_4',
      },
    ],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductImageDto)
  productImages: UpdateProductImageDto[];
}

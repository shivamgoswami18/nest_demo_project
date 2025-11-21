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
  product_benefit?: string;
}

class UpdateProductImageDto {
  @ApiProperty({
    example: 'image_1',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  overview_image?: string;

  @ApiProperty({
    example: 'image_2',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  service_image?: string;

  @ApiProperty({
    example: 'image_3',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  right_sidebar_image_1?: string;

  @ApiProperty({
    example: 'image_4',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  right_sidebar_image_2?: string;
}

class UpdateProductServiceDetailDto {
  @ApiProperty({
    example: 'Track carbon emissions',
    required: false,
  })
  @IsString()
  @IsOptional()
  product_service_detail?: string;
}

class UpdateProductServiceDto {
  @ApiProperty({
    example: 'Record Your Impact',
    required: false,
  })
  @IsString()
  @IsOptional()
  product_service_type?: string;

  @ApiProperty({
    type: [UpdateProductServiceDetailDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductServiceDetailDto)
  @IsOptional()
  product_service_details?: UpdateProductServiceDetailDto[];
}

class UpdateProductExpertiseDto {
  @ApiProperty({
    example: 'Environmental Data Tracking',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  expertise_area: string;

  @ApiProperty({
    example: 'Track emissions, energy usage',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  expertise_description: string;
}

class UpdateProductMethodologyDto {
  @ApiProperty({
    example: 'Assess current environmental impact and sustainability goals.',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  methodology_description: string;
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
      { product_benefit: 'Improves productivity' },
      { product_benefit: 'Learn new things' },
    ],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductBenefitDto)
  product_benefits?: UpdateProductBenefitDto[];

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
  product_images?: UpdateProductImageDto[];

  @ApiProperty({
    type: [UpdateProductServiceDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductServiceDto)
  @IsOptional()
  product_services?: UpdateProductServiceDto[];

  @ApiProperty({
    type: [UpdateProductExpertiseDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductExpertiseDto)
  @IsOptional()
  product_expertise?: UpdateProductExpertiseDto[];

  @ApiProperty({
    type: [UpdateProductMethodologyDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductMethodologyDto)
  product_methodology: UpdateProductMethodologyDto[];
}

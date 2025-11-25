import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ServiceImageDto {
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

export class UpdateServiceDto {
  @ApiProperty({
    example: 'Web Development',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  service_name: string;

  @ApiProperty({
    example: 'Empowering Your Online Presence',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  service_description: string;

  @ApiProperty({
    example: false,
    type: 'boolean',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_deleted: boolean;

  @ApiProperty({
    type: [ServiceImageDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImageDto)
  service_images: ServiceImageDto[];
}

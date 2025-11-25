import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ServiceImageDto {
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

export class CreateServiceDto {
  @ApiProperty({
    example: 'Web Development',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  service_name: string;

  @ApiProperty({
    example: 'Empowering Your Online Presence',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  service_description: string;

  @ApiProperty({
    example: false,
    type: 'boolean',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_deleted: boolean;

  @ApiProperty({
    type: [ServiceImageDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImageDto)
  service_images: ServiceImageDto[];
}

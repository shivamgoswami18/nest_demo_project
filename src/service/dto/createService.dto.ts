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

class SubServiceDto {
  @ApiProperty({
    example: 'Custom Website Development',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  sub_service_title: string;

  @ApiProperty({
    example:
      'We specialize in creating custom websites that are aligned with your business goals',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  sub_service_description: string;
}

class ServiceApproachDto {
  @ApiProperty({
    example: 'We start every project',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  services_details_point: string;
}

class ServiceBenefitDto {
  @ApiProperty({
    example: 'A website or application',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  services_details_point: string;
}

class ServiceAtcDto {
  @ApiProperty({
    example: 'At the heart of our web development services',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  services_details_point: string;
}

class ServiceConsultingDto {
  @ApiProperty({
    example: 'software-development',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  services_details_point: string;

  @ApiProperty({
    example: 'Innovate, Build, and Grow. Cuentista Tech offers',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  services_details_description: string;
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
    type: [ServiceImageDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImageDto)
  service_images: ServiceImageDto[];

  @ApiProperty({
    type: [SubServiceDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubServiceDto)
  sub_service: SubServiceDto[];

  @ApiProperty({
    type: [ServiceApproachDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceApproachDto)
  approaches: ServiceApproachDto[];

  @ApiProperty({
    type: [ServiceBenefitDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceBenefitDto)
  benefits: ServiceBenefitDto[];

  @ApiProperty({
    type: [ServiceAtcDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceAtcDto)
  atc: ServiceAtcDto[];

  @ApiProperty({
    type: [ServiceConsultingDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceConsultingDto)
  consulting: ServiceConsultingDto[];
}

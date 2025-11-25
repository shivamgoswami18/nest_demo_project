import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'John Doe',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'phone',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 25,
    type: 'number',
    format: 'int32',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  age?: number;
}

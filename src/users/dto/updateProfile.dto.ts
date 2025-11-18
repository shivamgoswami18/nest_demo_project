import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  IsNumber,
} from 'class-validator';

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
    example: 'john.doe@example.com',
    type: 'string',
    format: 'email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    type: 'string',
    format: 'password',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message:
      'Password must be at least 6 characters long and contain at least one letter and one number.',
  })
  password?: string;

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

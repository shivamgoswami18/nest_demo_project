import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    type: 'string',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

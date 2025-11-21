import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'old password',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @ApiProperty({
    example: 'new password',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  new_password: string;
}

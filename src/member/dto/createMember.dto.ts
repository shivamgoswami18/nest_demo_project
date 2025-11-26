import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    example: 'Charisma Megayana',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  member_name: string;

  @ApiProperty({
    example: 'Head of Marketing',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  member_position: string;

  @ApiProperty({
    example: 'member_image',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  member_image: string;
}

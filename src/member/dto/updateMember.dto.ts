import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty({
    example: 'Charisma Megayana',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  member_name: string;

  @ApiProperty({
    example: 'Head of Marketing',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  member_position: string;

  @ApiProperty({
    example: 'member_image',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  member_image: string;
}

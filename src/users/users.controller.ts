import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { UsersService } from './users.service';
import { ApiTag } from 'src/libs/utility/constants/enums';

@ApiTags(ApiTag.USERS)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Registration',
    description: 'This API allows a new user to register.',
  })
  @Post('registration')
  async registration(@Body() dto: RegistrationDto) {
    return await this.usersService.registration(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'View User Profile',
    description: 'Fetch user profile details by user ID.',
  })
  @Get('viewProfile/:id')
  async viewProfile(@Param('id') id: string) {
    return await this.usersService.viewProfile(id);
  }
}

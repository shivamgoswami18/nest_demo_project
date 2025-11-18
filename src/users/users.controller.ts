import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { UsersService } from './users.service';
import { ApiTag } from 'src/libs/utility/constants/enums';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UserPaginationDto } from './dto/userPagination.dto';

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

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update User Profile',
    description: 'Update user profile details by user ID.',
  })
  @Post('updateProfile/:id')
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return await this.usersService.updateProfile(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete User',
    description: 'Delete user by ID.',
  })
  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List of Users',
    description: 'This API allows to view all users with pagination.',
  })
  @Post('listOfUsers')
  async listOfUsers(@Body() dto: UserPaginationDto) {
    return await this.usersService.listOfUsers(dto);
  }
}

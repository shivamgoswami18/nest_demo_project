import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { UsersService } from './users.service';
import { ApiTag } from 'src/libs/utility/constants/enums';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UserPaginationDto } from './dto/userPagination.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/libs/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/libs/service/auth/roles.guard';
import { Public } from 'src/libs/helpers/decorators/public.decorator';
import { ChangePasswordDto } from './dto/changePassword.dto';

@ApiTags(ApiTag.USER)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Registration',
    description: 'This API allows a new user to register.',
  })
  @Post('registration')
  @Public()
  async registration(@Body() dto: RegistrationDto) {
    return await this.usersService.registration(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'View User Profile',
    description: 'Fetch user profile details by user ID. Admin access only.',
  })
  @Get('viewProfile')
  async viewProfile(@Request() req: any) {
    return await this.usersService.viewProfile(req);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update User Profile',
    description: 'Update user profile details by user ID.',
  })
  @Patch('updateProfile')
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return await this.usersService.updateProfile(req, dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete User',
    description: 'Delete user by ID.',
  })
  @Delete('deleteUser')
  async deleteUser(@Request() req: any) {
    return await this.usersService.deleteUser(req);
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

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Login',
    description: 'This API allows user to login using email and password.',
  })
  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    return await this.usersService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Change Password',
    description: 'Change your password',
  })
  @Post('changePassword')
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    return await this.usersService.changePassword(req, dto);
  }
}

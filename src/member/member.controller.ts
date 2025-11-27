import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiTag } from 'src/libs/utility/constants/enums';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/createMember.dto';
import { UpdateMemberDto } from './dto/updateMember.dto';
import { UserPaginationDto } from 'src/users/dto/userPagination.dto';

@ApiTags(ApiTag.MEMBER)
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create Member',
    description: 'This api wiil be used for create member',
  })
  @Post('createMember')
  async createMember(@Body() dto: CreateMemberDto) {
    return await this.memberService.createMember(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'View Member',
    description: 'This api will be used for view the member details',
  })
  @Get('viewMember/:id')
  async viewMember(@Param('id') id: string) {
    return await this.memberService.viewMember(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Member',
    description: 'This api will be used for update the member details',
  })
  @Patch('updateMember/:id')
  async updateMember(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return await this.memberService.updateMember(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete Member',
    description: 'This api will be used for delete the member details',
  })
  @Patch('deleteMember/:id')
  async deleteMember(@Param('id') id: string) {
    return await this.memberService.deleteMember(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List Of Members',
    description: 'This api will give list of members',
  })
  @Post('listOfMembers')
  async listOfMembers(@Body() dto: UserPaginationDto) {
    return await this.memberService.listOfMembers(dto);
  }
}

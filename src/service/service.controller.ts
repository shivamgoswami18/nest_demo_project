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
import { ServiceService } from './service.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/createService.dto';
import { ApiTag } from 'src/libs/utility/constants/enums';
import { UpdateServiceDto } from './dto/updateService.dto';
import { UserPaginationDto } from 'src/users/dto/userPagination.dto';

@ApiTags(ApiTag.SERVICE)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create Service',
    description: 'This API allows to create a new service.',
  })
  @Post('createService')
  async createService(@Body() dto: CreateServiceDto) {
    return await this.serviceService.createService(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'View Service',
    description: 'This API allows to view a service.',
  })
  @Get('viewService/:id')
  async viewService(@Param('id') id: string) {
    return await this.serviceService.viewService(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Service',
    description: 'This API allows to update a service.',
  })
  @Patch('updateService/:id')
  async updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return await this.serviceService.updateService(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete Service',
    description: 'This API allows to delete a service.',
  })
  @Patch('deleteService/:id')
  async deleteService(@Param('id') id: string) {
    return await this.serviceService.deleteService(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List Services',
    description: 'List all services with pagination, search, and sorting.',
  })
  @Post('listOfServices')
  async listOfServices(@Body() dto: UserPaginationDto) {
    return await this.serviceService.listOfServices(dto);
  }
}

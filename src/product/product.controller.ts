import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiTag, UserRole } from 'src/libs/utility/constants/enums';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UserPaginationDto } from 'src/users/dto/userPagination.dto';
import { JwtAuthGuard } from 'src/libs/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/libs/service/auth/roles.guard';
import { Roles } from 'src/libs/helpers/decorators/roles.decorator';

@ApiTags(ApiTag.PRODUCT)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create Product',
    description: 'This API allows to create a new product.',
  })
  @Post('createProduct')
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'View Product',
    description: 'Fetch single product details by ID.',
  })
  @Post('viewProduct/:id')
  async viewProduct(@Param('id') id: string) {
    return await this.productService.viewProduct(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Product',
    description: 'Update a product using its ID.',
  })
  @Patch('updateProduct/:id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete Product',
    description: 'Delete product using ID.',
  })
  @Delete('deleteProduct/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List Products',
    description: 'List all products with pagination, search, and sorting.',
  })
  @Post('listOfProducts')
  async listOfProducts(@Body() dto: UserPaginationDto) {
    return await this.productService.listOfProducts(dto);
  }
}

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/model/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { Messages } from 'src/libs/utility/constants/message';
import { HandleResponse } from 'src/libs/service/handleResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UserPaginationDto } from 'src/users/dto/userPagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    await this.productModel.create(dto);

    Logger.log(`Product ${Messages.CREATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Product ${Messages.CREATED_SUCCESSFULLY}`,
    );
  }

  async viewProduct(id: string) {
    const product = await this.productModel.find({ _id: id });

    if (!product) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Product ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Product ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Product ${Messages.FETCHED_SUCCESSFULLY}`,
      {
        product,
      },
    );
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updatedProduct) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Product ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Product ${Messages.UPDATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.ACCEPTED,
      ResponseData.SUCCESS,
      `Product ${Messages.UPDATED_SUCCESSFULLY}`,
    );
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Product ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Product ${Messages.DELETED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Product ${Messages.DELETED_SUCCESSFULLY}`,
    );
  }

  async listOfProducts(dto: UserPaginationDto) {
    const { page = 1, limit = 10, sortKey, sortOrder, search } = dto;

    const pipeline: any[] = [];

    if (search) {
      pipeline.push({
        $match: {
          $or: [{ product_name: { $regex: search, $options: 'i' } }],
        },
      });
    }

    if (sortKey) {
      pipeline.push({
        $sort: {
          [sortKey]: sortOrder === 'asc' ? 1 : -1,
        },
      });
    } else {
      pipeline.push({
        $sort: {
          createdAt: -1,
        },
      });
    }

    const countPipeline = [...pipeline];

    if (page && limit) {
      const skipCount = (Number(page) - 1) * Number(limit);
      pipeline.push({ $skip: skipCount }, { $limit: Number(limit) });
    }

    pipeline.push({
      $project: {
        _id: 1,
        product_name: 1,
      },
    });

    const [products, totalCountResult] = await Promise.all([
      this.productModel.aggregate(pipeline),
      this.productModel.aggregate<{ total: number }>([
        ...countPipeline,
        { $count: 'total' },
      ]),
    ]);

    const totalItems: number =
      (totalCountResult as { total: number }[])[0]?.total ?? 0;

    if (products.length === 0) {
      Logger.error(`Products ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Products ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Products ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Products ${Messages.FETCHED_SUCCESSFULLY}`,
      {
        products,
        totalCount: totalItems,
        itemsCount: products.length,
        currentPage: page ? Number(page) : null,
        totalPage: Math.ceil(totalItems / Number(limit)),
        pageSize: limit ? Number(limit) : 1,
      },
    );
  }
}

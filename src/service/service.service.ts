import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from 'src/model/service.schema';
import { CreateServiceDto } from './dto/createService.dto';
import { Messages } from 'src/libs/utility/constants/message';
import { HandleResponse } from 'src/libs/service/handleResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { UpdateServiceDto } from './dto/updateService.dto';
import { UserPaginationDto } from 'src/users/dto/userPagination.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async createService(dto: CreateServiceDto) {
    await this.serviceModel.create(dto);

    Logger.log(`Service ${Messages.CREATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Service ${Messages.CREATED_SUCCESSFULLY}`,
    );
  }

  async viewService(id: string) {
    const service = await this.serviceModel.findById(id);

    if (!service) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.SUCCESS,
        `Service ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Service ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Service ${Messages.FETCHED_SUCCESSFULLY}`,
      { service },
    );
  }

  async updateService(id: string, dto: UpdateServiceDto) {
    const updatedService = await this.serviceModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updatedService) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Service ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Service ${Messages.UPDATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.ACCEPTED,
      ResponseData.SUCCESS,
      `Service ${Messages.UPDATED_SUCCESSFULLY}`,
      { id },
    );
  }

  async deleteService(id: string) {
    const service = await this.serviceModel.findById(id);

    if (!service) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Service ${Messages.NOT_FOUND}`,
      );
    }

    if (service.is_deleted === true) {
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `Service ${Messages.ALREADY_DELETED}`,
      );
    }

    service.is_deleted = true;
    await service.save();

    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Service ${Messages.DELETED_SUCCESSFULLY}`,
    );
  }

  async listOfServices(dto: UserPaginationDto) {
    const { page = 1, limit = 10, sortKey, sortOrder, search } = dto;

    const pipeline: any[] = [];

    pipeline.push({
      $match: {
        is_deleted: false,
      },
    });

    if (search) {
      pipeline.push({
        $match: {
          $or: [{ service_name: { $regex: search, $options: 'i' } }],
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
        service_name: 1,
      },
    });

    const [services, totalCountResult] = await Promise.all([
      this.serviceModel.aggregate(pipeline),
      this.serviceModel.aggregate<{ total: number }>([
        ...countPipeline,
        { $count: 'total' },
      ]),
    ]);

    const totalItems: number =
      (totalCountResult as { total: number }[])[0]?.total ?? 0;

    if (services.length === 0) {
      Logger.error(`Services ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Services ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Services ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Services ${Messages.FETCHED_SUCCESSFULLY}`,
      {
        services,
        totalCount: totalItems,
        itemsCount: services.length,
        currentPage: page ? Number(page) : null,
        totalPage: Math.ceil(totalItems / Number(limit)),
        pageSize: limit ? Number(limit) : 1,
      },
    );
  }
}

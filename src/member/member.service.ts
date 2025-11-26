import { HttpStatus, Injectable, Logger, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from 'src/model/member.schema';
import { CreateMemberDto } from './dto/createMember.dto';
import { Messages } from 'src/libs/utility/constants/message';
import { HandleResponse } from 'src/libs/service/handleResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { UpdateMemberDto } from './dto/updateMember.dto';
import { UserPaginationDto } from 'src/users/dto/userPagination.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) {}

  async createMember(dto: CreateMemberDto) {
    await this.memberModel.create(dto);

    Logger.log(`Member ${Messages.CREATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Member ${Messages.CREATED_SUCCESSFULLY}`,
    );
  }

  async viewMember(id: string) {
    const member = await this.memberModel.findById(id);

    if (!member) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Member ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Member ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Member ${Messages.FETCHED_SUCCESSFULLY}`,
      { member },
    );
  }

  async updateMember(id: string, dto: UpdateMemberDto) {
    const member = await this.memberModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!member) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Member ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Member ${Messages.UPDATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Member ${Messages.UPDATED_SUCCESSFULLY}`,
    );
  }

  async deleteMember(id: string) {
    const member = await this.memberModel.findById(id);

    if (!member) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Member ${Messages.NOT_FOUND}`,
      );
    }

    if (member.is_deleted === true) {
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `Member ${Messages.ALREADY_DELETED}`,
      );
    }

    member.is_deleted = true;
    await member.save();

    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Member ${Messages.DELETED_SUCCESSFULLY}`,
    );
  }

  async listOfMembers(dto: UserPaginationDto) {
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
          $or: [
            { member_name: { $regex: search, $options: 'i' } },
            { member_position: { $regex: search, $options: 'i' } },
          ],
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
        member_name: 1,
        member_position: 1,
        member_image: 1,
      },
    });

    const [members, totalCountResult] = await Promise.all([
      this.memberModel.aggregate(pipeline),
      this.memberModel.aggregate<{ total: number }>([
        ...countPipeline,
        { $count: 'total' },
      ]),
    ]);

    const totalItems: number =
      (totalCountResult as { total: number }[])[0]?.total ?? 0;

    if (members.length === 0) {
      Logger.error(`Members ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Members ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Members ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Members ${Messages.FETCHED_SUCCESSFULLY}`,
      {
        members,
        totalCount: totalItems,
        itemsCount: members.length,
        currentPage: page ? Number(page) : null,
        totalPage: Math.ceil(totalItems / Number(limit)),
        pageSize: limit ? Number(limit) : 1,
      },
    );
  }
}

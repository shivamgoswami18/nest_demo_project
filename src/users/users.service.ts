import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { HandleResponse } from 'src/libs/service/handleResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { User, UserDocument } from 'src/model/user.schema';
import { RegistrationDto } from './dto/registration.dto';
import { Messages } from 'src/libs/utility/constants/message';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UserPaginationDto } from './dto/userPagination.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/libs/utility/constants/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: RegistrationDto) {
    const { email, password, ...userDetails } = dto;
    const findUser = await this.userModel.findOne({ email });

    if (findUser) {
      Logger.error(`User ${Messages.IS_ALREADY_EXIST}`);
      return HandleResponse(
        HttpStatus.CONFLICT,
        ResponseData.ERROR,
        `User ${Messages.IS_ALREADY_EXIST}`,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashPassword,
      role: dto.role,
      ...userDetails,
    });

    const { password: _, ...responseUser } = user.toObject();

    Logger.log(`User ${Messages.IS_CREATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `User ${Messages.IS_CREATED_SUCCESSFULLY}`,
      {
        ...responseUser,
      },
    );
  }

  async viewProfile(id: string, currentUserRole?: string) {
    if (currentUserRole !== UserRole.ADMIN) {
      Logger.error(Messages.ACCESS_DENIED_ADMIN_REQUIRED);
      return HandleResponse(
        HttpStatus.FORBIDDEN,
        ResponseData.ERROR,
        Messages.ACCESS_DENIED_ADMIN_REQUIRED,
      );
    }

    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      Logger.error(`User ${Messages.IS_NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.IS_NOT_FOUND}`,
      );
    }

    Logger.log(`User ${Messages.IS_FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `User ${Messages.IS_FETCHED_SUCCESSFULLY}`,
      {
        user,
      },
    );
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    if (dto.email) {
      const emailExists = await this.userModel.findOne({
        email: dto.email,
        _id: { $ne: id },
      });
      if (emailExists) {
        Logger.error(`Email ${Messages.IS_ALREADY_EXIST}`);
        return HandleResponse(
          HttpStatus.CONFLICT,
          ResponseData.ERROR,
          `Email ${Messages.IS_ALREADY_EXIST}`,
        );
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
      select: '-password',
    });

    if (!user) {
      Logger.error(`User ${Messages.IS_NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.IS_NOT_FOUND}`,
      );
    }

    Logger.log(`User ${Messages.IS_UPDATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `User ${Messages.IS_UPDATED_SUCCESSFULLY}`,
      {
        user,
      },
    );
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).select('-password');

    if (!user) {
      Logger.error(`User ${Messages.IS_NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.IS_NOT_FOUND}`,
      );
    }

    Logger.log(`User ${Messages.IS_DELETED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `User ${Messages.IS_DELETED_SUCCESSFULLY}`,
    );
  }

  async listOfUsers(dto: UserPaginationDto) {
    const { page = 1, limit = 10, sortKey, sortOrder, search } = dto;

    const pipeline: any[] = [];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
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
        name: 1,
        email: 1,
        phone: 1,
        age: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    });

    const [users, totalCountResult] = await Promise.all([
      this.userModel.aggregate(pipeline),
      this.userModel.aggregate<{ total: number }>([
        ...countPipeline,
        { $count: 'total' },
      ]),
    ]);

    const totalItems: number =
      (totalCountResult as { total: number }[])[0]?.total ?? 0;

    if (users.length === 0) {
      Logger.error(`Users ${Messages.IS_NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Users ${Messages.IS_NOT_FOUND}`,
      );
    }

    Logger.log(`Users ${Messages.IS_FETCHED_SUCCESSFULLY}`);
    return HandleResponse(HttpStatus.OK, ResponseData.SUCCESS, undefined, {
      users,
      totalCount: totalItems,
      itemsCount: users.length,
      currentPage: page ? Number(page) : null,
      totalPage: Math.ceil(totalItems / Number(limit)),
      pageSize: limit ? Number(limit) : 1,
    });
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      Logger.error(`User ${Messages.IS_NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.IS_NOT_FOUND}`,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      Logger.error(Messages.INVALID_CREDENTIALS);
      return HandleResponse(
        HttpStatus.UNAUTHORIZED,
        ResponseData.ERROR,
        Messages.INVALID_CREDENTIALS,
      );
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    Logger.log(Messages.LOGIN_SUCCESSFULLY);

    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      Messages.LOGIN_SUCCESSFULLY,
      token,
    );
  }
}

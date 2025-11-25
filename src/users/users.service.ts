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
import { ChangePasswordDto } from './dto/changePassword.dto';

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
      Logger.error(`User ${Messages.ALREADY_EXIST}`);
      return HandleResponse(
        HttpStatus.CONFLICT,
        ResponseData.ERROR,
        `User ${Messages.ALREADY_EXIST}`,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      email,
      password: hashPassword,
      ...userDetails,
    });

    Logger.log(`User ${Messages.CREATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `User ${Messages.CREATED_SUCCESSFULLY}`,
    );
  }

  async viewProfile(req: any) {
    const user = await this.userModel
      .findById(req.user.userId)
      .select('-password');

    if (!user) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`User ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `User ${Messages.FETCHED_SUCCESSFULLY}`,
      {
        user,
      },
    );
  }

  async updateProfile(req: any, dto: UpdateProfileDto) {
    const user = await this.userModel.findByIdAndUpdate(req.user.userId, dto, {
      new: true,
      select: '-password',
    });

    if (!user) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`User ${Messages.UPDATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.ACCEPTED,
      ResponseData.SUCCESS,
      `User ${Messages.UPDATED_SUCCESSFULLY}`,
    );
  }

  async deleteUser(req: any) {
    const user = await this.userModel
      .findByIdAndDelete(req.user.userId)
      .select('-password');

    if (!user) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`User ${Messages.DELETED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `User ${Messages.DELETED_SUCCESSFULLY}`,
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
      Logger.error(`Users ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Users ${Messages.NOT_FOUND}`,
      );
    }

    Logger.log(`Users ${Messages.FETCHED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Users ${Messages.FETCHED_SUCCESSFULLY}`,
      {
        users,
        totalCount: totalItems,
        itemsCount: users.length,
        currentPage: page ? Number(page) : null,
        totalPage: Math.ceil(totalItems / Number(limit)),
        pageSize: limit ? Number(limit) : 1,
      },
    );
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
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

  async changePassword(req: any, dto: ChangePasswordDto) {
    const { old_password, new_password } = dto;
    const user = await this.userModel.findById(req.user.userId);

    if (!user) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
      );
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.ERROR,
        `Old password ${Messages.INCORRECT}`,
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await this.userModel.findByIdAndUpdate(
      req.user.userId,
      {
        password: hashedPassword,
      },
      { new: true },
    );

    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Password ${Messages.CHANGED_SUCCESSFULLY}`,
    );
  }
}

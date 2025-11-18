import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { HandleResponse } from 'src/libs/service/handleResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { User, UserDocument } from 'src/model/user.schema';
import { RegistrationDto } from './dto/registration.dto';
import { Messages } from 'src/libs/utility/constants/message';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
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
      ...userDetails,
    });

    Logger.log(`User ${Messages.IS_CREATED_SUCCESSFULLY}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `User ${Messages.IS_CREATED_SUCCESSFULLY}`,
      {
        email,
        ...userDetails,
      },
    );
  }

  async viewProfile(id: string) {
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
}

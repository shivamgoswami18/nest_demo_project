import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HandleResponse } from 'src/libs/service/handleResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { Messages } from 'src/libs/utility/constants/message';

@Injectable()
export class UploadService {
  async uploadFile(filename: string) {
    Logger.log(Messages.FILE_UPLOADED_SUCCESSFULLY);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      Messages.FILE_UPLOADED_SUCCESSFULLY,
      filename,
    );
  }
}

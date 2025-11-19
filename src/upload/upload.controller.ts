import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createFileUploadInterceptor } from 'src/libs/helpers/multer';
import { FileUploadDto } from 'src/libs/dto/upload.dto';
import { ApiTag } from 'src/libs/utility/constants/enums';
import { UploadService } from './upload.service';

@ApiTags(ApiTag.UPLOAD)
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Upload File',
    description: 'Upload a file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @Post('uploadFile')
  @UseInterceptors(
    createFileUploadInterceptor({
      destination: './uploads/files',
      fieldName: 'file',
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadFile(file.filename);
  }
}

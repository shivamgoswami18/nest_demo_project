import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  CustomError,
  ErrorResponse,
} from 'src/libs/utility/constants/interface';
import { ResponseData } from 'src/libs/utility/constants/response';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    ctx.getRequest();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let exMessage: string | string[] = 'Internal server error';
    let exResponse: ErrorResponse;

    if (typeof exception === 'object' && exception !== null) {
      const ex = exception as CustomError;

      httpStatus = ex.statusCode ? ex.statusCode : httpStatus;
      exMessage = ex.message;
    }

    if (exception instanceof HttpException) {
      exResponse = exception.getResponse() as ErrorResponse;

      if (exResponse?.trace && exResponse.trace.length > 0) {
        const trace = exResponse.trace;
        Logger.error(`Exception: ${JSON.stringify(trace)}`);
      }

      if (exResponse?.message && exResponse.message.length > 0) {
        exMessage = exResponse.message;
      }

      if (exResponse?.data) {
        const data = exResponse.data;
        Logger.error(`Exception: ${JSON.stringify(data)}`);
      }
    } else {
      const e = exception;
      Logger.error(`Exception: ${JSON.stringify(e)}`);
    }

    const responseBody = {
      statusCode: httpStatus,
      status: ResponseData.ERROR,
      message: exMessage,
    };

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

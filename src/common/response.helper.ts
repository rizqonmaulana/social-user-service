// src/common/response.helper.ts

import { Injectable, HttpException } from '@nestjs/common';
import { ApiResponse } from './api-response-interface';

@Injectable()
export class ResponseHelper {
  success<T>(data: T, message: string = 'Request successful'): ApiResponse<T> {
    return {
      status: 'success',
      message,
      data,
    };
  }

  error(message: string = 'Something wrong, please try again', statusCode: number = 400) {
    throw new HttpException({ status: 'error', message }, statusCode);
  }
}

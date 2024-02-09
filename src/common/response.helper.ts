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

  error(message: string, statusCode: number = 400) {
    throw new HttpException({ status: 'error', message }, statusCode);
  }
}

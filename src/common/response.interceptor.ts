import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ResponseHelper } from './response.helper'
import { ApiResponse } from './api-response-interface' // Import the ApiResponse interface

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly responseHelper: ResponseHelper) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof Object && data.hasOwnProperty('status')) {
          return data 
        }
        return this.responseHelper.success(data) // Format success response
      }),
      catchError(error => {
        // Handle errors and format error response
        const status = error.status || 500
        const message = error.response.message || error.message || 'Internal server error'
        return throwError(this.responseHelper.error(message, status))
    }),
    )
  }
}

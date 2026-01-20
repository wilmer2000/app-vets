import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const validationErrors: any = exceptionResponse.message.reduce(
      (acc: any, error: any) => {
        const [field, ...messages] = error.split(' ');
        const message = messages.join(' ');
        if (!acc[field]) {
          acc[field] = [];
        }
        acc[field].push(message);
        return acc;
      },
      {},
    );

    console.log(`Error: ${exception}`);
    console.log(exception.stack);
    console.log(exception.message);
    console.log(validationErrors);

    response.status(status).json({
      code: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

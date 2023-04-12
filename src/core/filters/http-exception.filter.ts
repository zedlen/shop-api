import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { MongoError } from 'mongodb';


@Catch(MongoError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response: FastifyReply = ctx.getResponse();

    switch (exception.name) {
      case 'MongoServerError':
        const mongoError = exception as MongoError;
        if (mongoError.code === 11000) {
          return response.status(HttpStatus.CONFLICT).send({
            errors: [
              {
                status: HttpStatus.CONFLICT,
                code: 'duplicate_key',
                details: mongoError.errmsg.split(':')[0],
              },
            ],
          });
        }
        break;

      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          errors: [
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              code: 'something_went_wrong',
              details: 'uncontrolled exception',
            },
          ],
        });
        break;
    }
  }
}

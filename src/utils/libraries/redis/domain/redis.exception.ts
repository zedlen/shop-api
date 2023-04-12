import { HttpException, HttpStatus } from '@nestjs/common';

export class RedisException extends HttpException {
  constructor() {
    super(
      {
        errors: [
          {
            status: HttpStatus.CONFLICT,
            code: 'CONFLICT',
            details: 'Key already in process',
          },
        ],
      },
      HttpStatus.CONFLICT,
    );
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoAuthException extends HttpException {
  constructor() {
    super(
      {
        errors: [
          {
            status: HttpStatus.UNAUTHORIZED,
            code: 'UNAUTHORIZED',
            details: "You don't have permission to access this resource",
          },
        ],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

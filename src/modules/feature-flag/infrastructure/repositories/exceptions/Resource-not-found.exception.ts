import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(
      {
        errors: [
          {
            status: HttpStatus.NOT_FOUND,
            code: 'not_found',
            details: 'Feature flag not found',
          },
        ],
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

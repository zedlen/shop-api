import { Controller, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { UsersService } from '../../domain/users.service';

/* verify that this is the name of the controller you want */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './infrastructure/controllers/users.controller'; 
import { UsersService } from './domain/users.service'; 
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { UsersEntity, UsersSchema } from './domain/models/entities/users.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UsersEntity.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class Users {}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersEntity } from '../../domain/models/entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(UsersEntity.name) private readonly model: Model<UsersEntity>) {}
}
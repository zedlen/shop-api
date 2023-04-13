import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeatureFlagEntity } from '../../domain/models/entities/feature-flag.entity';
import { CreateDto } from '../controllers/dtos/create.dto';
import { FeatureFlagInterface } from '../../domain/interfaces/feature-flag.interface';
import { UpdateDto } from '../controllers/dtos/update.dto';
import { ResourceNotFoundException } from './exceptions/Resource-not-found.exception';

@Injectable()
export class FeatureFlagRepository {
  constructor(
    @InjectModel(FeatureFlagEntity.name) private readonly model: Model<FeatureFlagEntity>,
  ) {}

  async findOne(id: string): Promise<FeatureFlagInterface> {
    const featureFlag = await this.model.findById(id);

    if (!featureFlag) throw new ResourceNotFoundException();

    return featureFlag;
  }

  async findOneByCode(code: string): Promise<FeatureFlagInterface> {
    return this.model.findOne({ code });
  }

  async findByCode(code: string): Promise<FeatureFlagInterface[]> {
    const featureFlag = await this.model.find({ code }).setOptions({ sanitizeFilter: true });

    if (!featureFlag.length) throw new ResourceNotFoundException();

    return featureFlag;
  }

  async findAll(): Promise<FeatureFlagInterface[]> {
    return this.model.find({});
  }

  async create(featureFlag: CreateDto): Promise<FeatureFlagInterface> {
    return this.model.create(featureFlag);
  }

  async update(id: string, featureFlag: UpdateDto): Promise<FeatureFlagInterface> {
    const featureFlagUpdated = await this.model.findOneAndUpdate({ _id: id }, featureFlag, {
      new: true,
    });

    if (!featureFlagUpdated) throw new ResourceNotFoundException();

    return featureFlagUpdated;
  }

  async delete(id: string): Promise<FeatureFlagInterface> {
    const featureFlag = await this.model.findByIdAndDelete(id);

    if (!featureFlag) throw new ResourceNotFoundException();

    return featureFlag;
  }
}

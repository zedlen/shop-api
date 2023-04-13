import { Injectable } from '@nestjs/common';

import { FeatureFlagRepository } from '../infrastructure/repositories/feature-flag.repository';
import { CreateDto } from '../infrastructure/controllers/dtos/create.dto';
import { FeatureFlagInterface } from './interfaces/feature-flag.interface';
import { UpdateDto } from '../infrastructure/controllers/dtos/update.dto';

@Injectable()
export class FeatureFlagService {
  constructor(private readonly featureflagRepository: FeatureFlagRepository) {}

  // TODO: feature flag with seller id pending to implement
  async isEnabled(code: string, sellerId?: number): Promise<boolean> {
    const featureFlag = await this.findOneByCode(code);

    if (!featureFlag) return false;

    if(sellerId) return featureFlag.sellers.includes(sellerId) || featureFlag.enable_all

    return featureFlag.enable_all;
  }

  async findOneByCode(code: string): Promise<FeatureFlagInterface> {
    return this.featureflagRepository.findOneByCode(code);
  }

  async get(id: string): Promise<FeatureFlagInterface> {
    return this.featureflagRepository.findOne(id);
  }

  async getAll(code): Promise<FeatureFlagInterface[]> {
    if (code) {
      return this.featureflagRepository.findByCode(code);
    }

    return this.featureflagRepository.findAll();
  }

  async create(featureFlag: CreateDto): Promise<FeatureFlagInterface> {
    return this.featureflagRepository.create(featureFlag);
  }

  async update(id: string, featureFlag: UpdateDto): Promise<FeatureFlagInterface> {
    return this.featureflagRepository.update(id, featureFlag);
  }

  async delete(id: string): Promise<FeatureFlagInterface> {
    return this.featureflagRepository.delete(id);
  }
}

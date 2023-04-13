import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagController } from './feature-flag.controller';
import { FeatureFlagService } from '../../domain/feature-flag.service';
import { FeatureFlagRepository } from '../repositories/feature-flag.repository';
import { AuthGuard } from '../../../../core/guards/auth.guard';
import { FeatureFlagEntity, FeatureFlagSchema } from '../../domain/models/entities/feature-flag.entity';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";


describe('FeatureFlagController', () => {
  let appController: FeatureFlagController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let featureFlagModel: Model<FeatureFlagEntity>;
  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    featureFlagModel = mongoConnection.model(FeatureFlagEntity.name, FeatureFlagSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FeatureFlagController],     
      providers:[FeatureFlagService, FeatureFlagRepository, AuthGuard, {provide: getModelToken(FeatureFlagEntity.name), useValue: featureFlagModel}] 
    }).compile();

    appController = app.get<FeatureFlagController>(FeatureFlagController);
  });

  describe('get specific FF by code', () => {
    it('should return a featureflag item', () => {
      expect(appController.showAll("")).toEqual({});
    });
  });
});

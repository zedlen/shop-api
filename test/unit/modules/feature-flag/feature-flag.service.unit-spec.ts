import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagService } from '../../../../src/modules/feature-flag/domain/feature-flag.service';
import { FeatureFlagRepository } from '../../../../src/modules/feature-flag/infrastructure/repositories/feature-flag.repository';
import {
  FeatureFlagEntity,
  FeatureFlagSchema,
} from '../../../../src/modules/feature-flag/domain/models/entities/feature-flag.entity';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateDto } from '../../../../src/modules/feature-flag/infrastructure/controllers/dtos/create.dto';
import { FeatureFlagInterface } from '../../../../src/modules/feature-flag/domain/interfaces/feature-flag.interface';
import { ResourceNotFoundException } from '../../../../src/modules/feature-flag/infrastructure/repositories/exceptions/Resource-not-found.exception';

describe('FeatureFlagController', () => {
  let appService: FeatureFlagService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let featureFlagModel: Model<FeatureFlagEntity>;
  let createdFF: FeatureFlagInterface;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    featureFlagModel = mongoConnection.model(FeatureFlagEntity.name, FeatureFlagSchema);
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureFlagService,
        FeatureFlagRepository,
        { provide: getModelToken(FeatureFlagEntity.name), useValue: featureFlagModel },
      ],
    }).compile();

    appService = app.get<FeatureFlagService>(FeatureFlagService);
  });

  describe('get All features (empty)', () => {
    it('should return an empty array as we have no created any', async () => {
      expect(await appService.getAll()).toEqual([]);
    });
  });

  describe('create feature', () => {
    it('should create a new feature flag', async () => {
      const newFF = new CreateDto();      
      newFF.code = 'TEST';
      newFF.description = 'a';
      createdFF = await appService.create(newFF)
      expect(createdFF).toMatchObject({       
        code: 'TEST',
        description: 'a',
        enable_all: false,
        sellers: [],
      });
    });
  });

  describe('update feature', () => {
    it('should update the test feature flag', async () => {      
      expect(await appService.update(createdFF._id,{enable_all:true})).toMatchObject({               
        enable_all: true
      });
    });

    it('should throw exception', async () => {
      await expect( appService.update("63ee57f81a9c55001e7e6c46",{enable_all:true})).rejects.toBeInstanceOf(ResourceNotFoundException); 
    });
  });
  
  describe('check is feature is enabled', () => {
    it('should update the test feature flag', async () => {      
      expect(await appService.isEnabled("TEST")).toBe(true);
      expect(await appService.isEnabled("NOFF")).toBe(false);
      expect(await appService.isEnabled("TEST",123)).toBe(true);
    });
  });

  describe('get FF', () => {
    it('should retrive a feature flag by id', async () => {      
      expect(await appService.get(createdFF._id)).toMatchObject({       
        code: 'TEST',
        description: 'a',
        enable_all: true,
        sellers: [],
      });      
    });
    it('should throw exception', async () => {
      await expect( appService.get("63ee57f81a9c55001e7e6c46")).rejects.toBeInstanceOf(ResourceNotFoundException); 
    });
  });

  describe('get FF by code', () => {
    it('should retrive a feature flag by id', async () => {      
      expect(await appService.findOneByCode("TEST")).toMatchObject({       
        code: 'TEST',
        description: 'a',
        enable_all: true,
        sellers: [],
      });      
    });
    it('should return null', async () => {
      expect(await appService.findOneByCode("63ee57f81a9c55001e7e6c46")).toBe(null); 
    });
  });

  describe('get All features', () => {
    it('should return the created FF', async () => {
      expect(await appService.getAll()).toMatchObject([{       
        code: 'TEST',
        description: 'a',
        enable_all: true,
        sellers: [],
      }]); 
      
      expect(await appService.getAll("TEST")).toMatchObject([{       
        code: 'TEST',
        description: 'a',
        enable_all: true,
        sellers: [],
      }]); 
    });

    it('should throw exception', async () => {
      await expect( appService.getAll("NONE")).rejects.toBeInstanceOf(ResourceNotFoundException); 
    });
  });

  describe('delete FF', () => {
    it('should delete the ff', async () => {
      expect(await appService.delete(createdFF._id)).toMatchObject({       
        code: 'TEST',
        description: 'a',
        enable_all: true,
        sellers: [],
      });      
    });

    it('should throw exception', async () => {
      await expect( appService.delete("63ee57f81a9c55001e7e6c46")).rejects.toBeInstanceOf(ResourceNotFoundException); 
    });
  })
});

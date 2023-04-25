import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const mongoDbMemoryModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'shop_api_test',
          ip: '127.0.0.1',
        },
      });

      const uri = mongod.getUri();

      return {
        uri,
        ...options,
      };
    },
  });

export const closeMongoDbConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};

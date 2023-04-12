import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionString } from 'connection-string';
import { MongodbConfigType } from '../utils/types/mongodb-config-type';
import { mongodbConfigLoader } from '../config/loaders/mongodb.loader';
import { configModuleOptions } from '../config/options/config-module.options';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongodbConfigLoader)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const mongodbConfig = configService.get<MongodbConfigType>('mongodb');

          const uri = new ConnectionString('', {
            protocol: mongodbConfig.port ? 'mongodb' : 'mongodb+srv',
            hosts: [{ name: mongodbConfig.host, port: mongodbConfig.port }], 
          })
            .setDefaults({
              user: mongodbConfig.database_user || '',
              password: mongodbConfig.database_password || '',
              path: [mongodbConfig.dababase_name],
              params: {
                authSource: mongodbConfig.auth_source || mongodbConfig.dababase_name || '',
                ssl: mongodbConfig.ssl || false,
                retryWrites: mongodbConfig.retry_writes || false,
            }
            })
            .toString();

          const connection = {
            uri,
            dbName: mongodbConfig.dababase_name,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectionFactory: async (
              connection: mongoose.Connection,
            ): Promise<mongoose.Connection> => {
              return connection;
            },
          };

          return connection;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
})
export class ApplicationCoreModule {}

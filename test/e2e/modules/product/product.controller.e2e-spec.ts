import * as request from 'supertest';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { mongoDbMemoryModule, closeMongoDbConnection } from '../../../database/mongo-handler';
import {
  duplicateCoverageError,
  emptyCarrierError,
  payloadWithEmptyCarriers,
  unauthorizedResponse,
  validPayload,
} from './item-controller.mock';
import { Product } from '../../../../src/modules/product/product.module';

describe('Coverage controller', () => {
  let app: NestFastifyApplication;
  let server: NestFastifyApplication;  
  beforeAll(async () => {        
    const moduleRef = await Test.createTestingModule({
      imports: [mongoDbMemoryModule(), Product],
    })
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await closeMongoDbConnection();
    await app.close();
  });

  it('should return unauthorized', async () => {
    await request(server)
      .post('/products')
      .set('Authorization', `token=123`)
      .send(validPayload)
      .expect(401)
      .expect((res) => {
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors[0]).toStrictEqual(unauthorizedResponse);
      });
  });

});

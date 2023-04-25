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
} from './feature-flag-controller.mock';
import { FeatureFlag } from '../../../../src/modules/feature-flag/feature-flag.module';

describe('Coverage controller', () => {
  let app: NestFastifyApplication;
  let server: NestFastifyApplication;
  let ffId: string;
  beforeAll(async () => {        
    const moduleRef = await Test.createTestingModule({
      imports: [mongoDbMemoryModule(), FeatureFlag],
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
      .post('/feature-flag')
      .set('Authorization', `token=123`)
      .send(validPayload)
      .expect(401)
      .expect((res) => {
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors[0]).toStrictEqual(unauthorizedResponse);
      });
  });

  it('should return unauthorized', async () => {
    await request(server)
      .post('/feature-flag')      
      .send(validPayload)
      .expect(401)
      .expect((res) => {
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors[0]).toStrictEqual(unauthorizedResponse);
      });
  });

  it('should create a coverage', async () => {
    await request(server)
      .post('/feature-flag')
      .set('Authorization', `token=test`)
      .send(validPayload)
      .expect(201)
      .expect((res) => {
        ffId = res.body.data.id
        expect(res.body.data.attributes.code).toBe(validPayload.code);
        expect(res.body.data.attributes.description).toBe(validPayload.description);
        expect(res.body.data.attributes.enable_all).toStrictEqual(validPayload.enable_all);
        expect(res.body.data.attributes.sellers).toStrictEqual(validPayload.sellers);
      });
  });

  it('should avoid duplicated FF coode', async () => {
    await request(server)
      .post('/feature-flag')
      .set('Authorization', `token=test`)
      .send(validPayload)
      .expect(409);
  });

  it('should show all ff', async () => {
    await request(server)
      .get('/feature-flag')
      .set('Authorization', `token=test`)
      .send(validPayload)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data[0].type).toStrictEqual('feature-flag');
        expect(res.body.data[0].attributes.description).toBe(validPayload.description);
        expect(res.body.data[0].attributes.enable_all).toStrictEqual(validPayload.enable_all);
        expect(res.body.data[0].attributes.sellers).toStrictEqual(validPayload.sellers);
      });
  });

  it('should get specific ff', async () => {
    await request(server)
      .get(`/feature-flag/${ffId}`)
      .set('Authorization', `token=test`)
      .expect(200)
      .expect((res) => {        
        expect(res.body.data.type).toStrictEqual('feature-flag');
        expect(res.body.data.attributes.description).toBe(validPayload.description);
        expect(res.body.data.attributes.enable_all).toStrictEqual(validPayload.enable_all);
        expect(res.body.data.attributes.sellers).toStrictEqual(validPayload.sellers);
      });
  });

  it('should update ff', async () => {
    await request(server)
      .patch(`/feature-flag/${ffId}`)
      .set('Authorization', `token=test`)
      .send({enable_all: true})
      .expect(200)
      .expect((res) => {        
        expect(res.body.data.type).toStrictEqual('feature-flag');
        expect(res.body.data.attributes.description).toBe(validPayload.description);
        expect(res.body.data.attributes.enable_all).toStrictEqual(!validPayload.enable_all);
        expect(res.body.data.attributes.sellers).toStrictEqual(validPayload.sellers);
      });
  });

  it('should delete ff', async () => {
    await request(server)
      .delete(`/feature-flag/${ffId}`)
      .set('Authorization', `token=test`)
      .expect(200)
      .expect((res) => {        
        expect(res.body.data.type).toStrictEqual('feature-flag');
        expect(res.body.data.attributes.description).toBe(validPayload.description);
        expect(res.body.data.attributes.enable_all).toStrictEqual(!validPayload.enable_all);
        expect(res.body.data.attributes.sellers).toStrictEqual(validPayload.sellers);
      });
  });
});

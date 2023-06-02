import * as request from 'supertest';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { mongoDbMemoryModule, closeMongoDbConnection } from '../../../database/mongo-handler';
import {
  duplicateProductError,
  invalidPayload,
  unauthorizedResponse,
  validPayload,
} from './product-controller.mock';
import { Product } from '../../../../src/modules/product/product.module';

describe('Product controller', () => {
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

  describe('Create a new product', () => {
    it('should create product correctly', async () => {
      await request(server)
        .post('/products')
        .set('Authorization', `token=test`)
        .send(validPayload)
        .expect(200)
        .expect((res) => {
          expect(res.body.errors).toBeInstanceOf(Array);
          expect(res.body.errors[0]).toStrictEqual(unauthorizedResponse);
        });
    });

    it('should show duplicated entry', async () => {
      await request(server)
        .post('/products')
        .set('Authorization', `token=test`)
        .send(validPayload)
        .expect(400)
        .expect((res) => {
          expect(res.body.errors).toBeInstanceOf(Array);
          expect(res.body).toStrictEqual(duplicateProductError);
        });
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

    it('should indicates missing required param ', async () => {
      await request(server)
        .post('/products')
        .set('Authorization', `token=test`)
        .send(invalidPayload)
        .expect(400)
        .expect((res) => {
          expect(res.body.errors).toBeInstanceOf(Array);
          expect(res.body.errors[0]).toStrictEqual(unauthorizedResponse);
        });
    });
  })

  describe('Retrive product(s)', () => {
    it('should get all products', async () => {
      await request(server)
        .get('/products')        
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array);          
        });
    });

    it('should get product with filter', async () => {
      await request(server)
        .get('/products?q=item')        
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array);          
        });
    });

    it('should get specific item', async () => {
      await request(server)
        .get('/products/item_id')        
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Object);         
        });
    });

    it('should return product not found', async () => {
      await request(server)
        .get('/products/lost_item')        
        .expect(404)        
    });
  })

});

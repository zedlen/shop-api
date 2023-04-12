import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './controllers/health.controller';


describe('HealthController', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],      
    }).compile();

    appController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return serverr up message', () => {
      expect(appController.checkHealth()).toEqual({"message": "Server is up", "status": 200});
    });
  });
});

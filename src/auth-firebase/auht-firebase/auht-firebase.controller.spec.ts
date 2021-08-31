import { Test, TestingModule } from '@nestjs/testing';
import { AuhtFirebaseController } from './auht-firebase.controller';

describe('AuhtFirebaseController', () => {
  let controller: AuhtFirebaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuhtFirebaseController],
    }).compile();

    controller = module.get<AuhtFirebaseController>(AuhtFirebaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

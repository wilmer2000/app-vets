import { Test, TestingModule } from '@nestjs/testing';
import { EntityController } from './entity.controller.js';
import { EntityService } from './entity.service.js';

describe('EntityController', () => {
  let controller: EntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityController],
      providers: [EntityService],
    }).compile();

    controller = module.get<EntityController>(EntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

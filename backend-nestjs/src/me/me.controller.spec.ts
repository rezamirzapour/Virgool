import { Test, TestingModule } from '@nestjs/testing';
import { MeController } from './me.controller';
import { MeService } from './me.service';

describe('MeController', () => {
  let controller: MeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeController],
      providers: [MeService],
    }).compile();

    controller = module.get<MeController>(MeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

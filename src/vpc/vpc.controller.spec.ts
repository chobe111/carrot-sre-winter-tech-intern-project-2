import { Test, TestingModule } from '@nestjs/testing';
import { VpcController } from './vpc.controller';

describe('VpcController', () => {
  let controller: VpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VpcController],
    }).compile();

    controller = module.get<VpcController>(VpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

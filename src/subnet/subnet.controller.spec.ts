import { Test, TestingModule } from '@nestjs/testing';
import { SubnetController } from './subnet.controller';

describe('SubnetController', () => {
  let controller: SubnetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubnetController],
    }).compile();

    controller = module.get<SubnetController>(SubnetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

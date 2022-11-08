import { Test, TestingModule } from '@nestjs/testing';
import { VpcService } from './vpc.service';

describe('VpcService', () => {
  let service: VpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VpcService],
    }).compile();

    service = module.get<VpcService>(VpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

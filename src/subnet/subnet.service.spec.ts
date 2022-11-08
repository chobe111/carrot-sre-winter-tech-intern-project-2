import { Test, TestingModule } from '@nestjs/testing';
import { SubnetService } from './subnet.service';

describe('SubnetService', () => {
  let service: SubnetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubnetService],
    }).compile();

    service = module.get<SubnetService>(SubnetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

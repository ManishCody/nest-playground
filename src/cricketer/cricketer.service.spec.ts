import { Test, TestingModule } from '@nestjs/testing';
import { CricketerService } from './cricketer.service';

describe('CricketerService', () => {
  let service: CricketerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CricketerService],
    }).compile();

    service = module.get<CricketerService>(CricketerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

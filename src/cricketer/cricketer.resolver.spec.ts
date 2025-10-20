import { Test, TestingModule } from '@nestjs/testing';
import { CricketerResolver } from './cricketer.resolver';

describe('CricketerResolver', () => {
  let resolver: CricketerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CricketerResolver],
    }).compile();

    resolver = module.get<CricketerResolver>(CricketerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { CricketerResolver } from './cricketer.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CricketerService } from './cricketer.service';

@Module({
   imports:[PrismaModule],
  providers: [CricketerResolver,CricketerService]
})
export class CricketerModule {}

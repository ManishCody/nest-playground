import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([User]) ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}

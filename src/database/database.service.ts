import { Injectable } from '@nestjs/common';
import { OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  constructor(private configService: ConfigService) {}

  private isConnected = false;

  onModuleInit() {
    this.isConnected = true;
    console.log("connected");
  }

  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log(`shutdown due to ${signal}`);
  }

  getDbUrl() {
    console.log(this.configService.get<string>('DATABASE_URL'));
    return this.configService.get<string>('DATABASE_URL');
  }
}
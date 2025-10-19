import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    // === CORE MODULES ===
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL!),

    // === GraphQL Setup ===
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),

    // === MODULES USING GraphQL + MongoDB ===
    BookModule,  // ✅ Uses GraphQL with Mongoose

    // === MODULES USING OTHER ORMs (TypeORM, etc.) ===
    // ❌ COMMENTED OUT - Requires TypeOrmModule.forRoot() configuration
    // StudentModule,  // Uses TypeORM
    // AdminModule,    // Uses TypeORM
    // AuthModule,     // Uses TypeORM

    // === MODULES USING REST APIs ===
    // EmployeeModule, // Uses REST endpoints
  ],
  controllers: [AppController, UserController, ProductController, DatabaseController],
  providers: [AppService, ProductService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
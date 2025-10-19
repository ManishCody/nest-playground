import { Module } from '@nestjs/common';
import { studentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }])
    ],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule {}

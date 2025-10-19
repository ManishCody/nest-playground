import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor( private readonly StudentService : StudentService  ){}

    @Post()
    async createStudent(@Body() data: Partial<Student>) {
        return this.StudentService.createStudent(data);
    }

    @Get()
    async getAllStudents() {
        return this.StudentService.getAllStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        return this.StudentService.getStudentById(id);
    }

    @Get('email/:email')
    async findStudentByEmail(@Param('email') email: string) {
        return this.StudentService.findStudentByEmail(email);
    }

    @Put(':id')
    async updateStudent(@Param('id') id: string, @Body() data: Partial<Student>) {
        return this.StudentService.updateStudent(id, data);
    }

    @Patch(':id')
    async patchUpdateStudent(@Param('id') id: string,  @Body() data: Partial<Student>) {
        return this.StudentService.patchUpdateStudent(id, data);
    }


}

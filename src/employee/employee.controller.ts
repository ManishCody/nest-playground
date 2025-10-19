import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { create } from 'domain';
import { CreateEmployeeDto } from './dto/create.employee.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorators';
import { Role } from 'src/guards/roles/roles.enums';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('employee')
@UseFilters(HttpExceptionFilter)
export class EmployeeController {

    constructor( private readonly EmployeeService: EmployeeService){}

    @Get()
    @UseGuards(AuthGuard)
    getEmployee(){
        return this.EmployeeService.getEmployeeData()
    }

    @Get(":id")
    getEmployeeById(@Param('id',ParseIntPipe) id: number){
        return this.EmployeeService.getEmployeeById(Number(id));
    }

    @Post()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto){
        return this.EmployeeService.createEmployee(createEmployeeDto);
    }

    @Put()
    updateEmployee(@Body() updateEmployeeDto: Partial<CreateEmployeeDto>){
        const id = updateEmployeeDto.id;
        return this.EmployeeService.updateEmployee(Number(id), updateEmployeeDto);
    }

    @Delete(":id")
    deleteEmployee(@Param('id') id: number){
        return this.EmployeeService.deleteEmployee(Number(id));
    }

}

import { Injectable } from '@nestjs/common';
import { employee } from './interface/employee.interface';
import { CreateEmployeeDto } from './dto/create.employee.dto';

@Injectable()
export class EmployeeService {

    private employee: employee[] = [
        { id: 1, name: "mandy", age: 21 },
        { id: 2, name: "john", age: 25 },
        { id: 3, name: "sara", age: 30 },
        { id: 4, name: "paul", age: 28 },
        { id: 5, name: "lisa", age: 22 }
    ]

    getEmployeeData() {
        return this.employee;
    }

    getEmployeeById(id: number) {
        return this.employee.find(emp => emp.id === id);
    }

    updateEmployee(id: number, updatedEmployee: Partial<employee>) {
        const employeeIndex = this.employee.findIndex(emp => emp.id === id);
        if (employeeIndex > -1) {
            this.employee[employeeIndex] = { ...this.employee[employeeIndex], ...updatedEmployee };
            return this.employee[employeeIndex];
        }
        return null;
    }

    deleteEmployee(id: number) {
        const employeeIndex = this.employee.findIndex(emp => emp.id === id);
        if (employeeIndex > -1) {
            const deletedEmployee = this.employee.splice(employeeIndex, 1);
            return deletedEmployee[0];
        }
        return null;
    }

    createEmployee(newEmployee: CreateEmployeeDto) {
        newEmployee.id = this.employee.length + 1;
        this.employee.push(newEmployee);
        return this.employee;
    }


}

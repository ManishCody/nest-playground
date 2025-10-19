import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from './user.entity';

@Controller('admin')
export class AdminController {
    constructor(private readonly AdminService: AdminService) { }

    @Post()
    async createAdmin(@Body() body: Partial<User>) {
        return this.AdminService.createAdmin(body)
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.AdminService.getAdmin();
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<User | null> {
        return this.AdminService.getOneAdmin(id);
    }

    @Put(":id")
    async updateAdmin(@Param('id') id: number, @Body() body: Partial<User>): Promise<User> {
        return this.AdminService.UpdateAdmin(id, body);
    }

    @Delete(":id")
    async deleteAdmin(@Param('id') id: number): Promise<{ message: string }> {
        return this.AdminService.DeleteAdmin(id);
    }

}

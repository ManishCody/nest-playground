import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get("/mandy")
    getUser(){
        return { name: 'John Doe', age: 30 };
    }
}

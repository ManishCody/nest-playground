import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ) { }


    async createAdmin(AdminDate: Partial<User>): Promise<User> {
        const admin = this.UserRepository.create(AdminDate);
        return this.UserRepository.save(admin);
    }

    async getAdmin(): Promise<User[]> {
        return this.UserRepository.find();
    }

    async getOneAdmin(id: number): Promise<User | null> {
        const admin = this.UserRepository.findOneBy({ Id: id });
        if (!admin)
            throw new NotFoundException("admin not found")

        return admin
    }

    async UpdateAdmin(id: number, data: Partial<User>): Promise<User> {
        const admin = await this.UserRepository.findOneBy({ Id: id })

        if (!admin)
            throw new NotFoundException("admin not found")
        const udpate = Object.assign(admin, data)

        return this.UserRepository.save(udpate);

    }

    async DeleteAdmin(id: number): Promise<{ message: string }> {
        const res = await this.UserRepository.delete({ Id: id })
        if (res.affected == 0)
            throw new NotFoundException("admin not found")

        return {message : "deletd "};
    }

}

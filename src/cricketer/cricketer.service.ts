import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCricketerInput } from './dto/create-crickter.input';
import { UpdateCricketerInput } from './dto/update-crickter';

@Injectable()
export class CricketerService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCricketerInput) {
        return await this.prisma.cricketer.create({ data });
    }

    async findAll() {
        return await this.prisma.cricketer.findMany();
    }

    async findOne(id: string) {
        const cricketer = await this.prisma.cricketer.findUnique({ where: { id } });
        if (!cricketer) throw new NotFoundException(`Cricketer with id ${id} not found`);
        return cricketer;
    }


    async update(data: UpdateCricketerInput) {
        const { id, ...updateData } = data;
        return await this.prisma.cricketer.update({
            where: { id },
            data: updateData,
        });
    }

    async remove(id: string) {
        console.log('Trying to delete:', id);
        return await this.prisma.cricketer.delete({
            where: { id },
        });
    }
}

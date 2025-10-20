import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CricketerService } from './cricketer.service';
import { CreateCricketerInput } from './dto/create-crickter.input';
import { Cricketer } from './model/crickter.model';
import { UpdateCricketerInput } from './dto/update-crickter';

@Resolver(() => Cricketer)
export class CricketerResolver {
  constructor(private readonly cricketerService: CricketerService) {}

  @Query(() => [Cricketer], { name: 'getAllCricketers' })
  async getAllCricketers() {
    return await this.cricketerService.findAll();
  }

  @Query(() => Cricketer, { name: 'getCricketer' })
  async getCricketer(@Args('id') id: string) {
    return await this.cricketerService.findOne(id);
  }

  @Mutation(() => Cricketer)
  async createCricketer(@Args('data') data: CreateCricketerInput) {
    return await this.cricketerService.create(data);
  }

  @Mutation(() => Cricketer)
  async updateCricketer(@Args('data') data: UpdateCricketerInput) {
    return await this.cricketerService.update(data);
  }

  @Mutation(() => Cricketer)
  async removeCricketer(@Args('id') id: string) {
    return await this.cricketerService.remove(id);
  }
}

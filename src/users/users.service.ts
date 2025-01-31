import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(user_id: number): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { user_id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(user_id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(user_id, user);
    return this.usersRepository.findOneOrFail({ where: { user_id } });
  }

  async remove(user_id: number): Promise<void> {
    await this.usersRepository.delete(user_id);
  }
}
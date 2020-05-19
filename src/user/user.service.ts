import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>) {}

  save (user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findOne (id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  delete (id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}

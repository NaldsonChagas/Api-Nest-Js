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

  increaseMonthlyExpense (user: User, expenseValue: number) {
    user.monthlyExpense += expenseValue;
    this.save(user);
  }

  async restoreMonthlyExpense () {
    const users: User[] = await this.userRepository.find();
    users.forEach(user => {
      user.monthlyExpense = 0;
      this.save(user);
    });
  }

  findOne (id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  delete (id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ValidationPipe } from '../pipes/validation.pipe';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post()
  async create (@Body(new ValidationPipe()) user: User) {
    user.password = bcrypt.hashSync(user.password, 10);
    const response = await this.userService.create(user);
    return response;
  }
}

import { Controller, Post, Body, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ValidationPipe } from '../pipes/validation.pipe';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post()
  async create (@Body(new ValidationPipe()) user: User) {
    user.password = bcrypt.hashSync(user.password, 10);
    const response = await this.userService.save(user);
    return response;
  }

  @Put()
  async update (@Body(new ValidationPipe()) user: User, @Req() request: Request) {
    user.id = Number(request.headers.userid);
    return await this.userService.save(user);
  }
}

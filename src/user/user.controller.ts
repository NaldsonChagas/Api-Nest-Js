import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post()
  async create (@Req() request: Request) {
    const user: User = request.body;
    const response = await this.userService.create(user);
    return response;
  }
}

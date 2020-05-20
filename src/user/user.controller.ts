import { Controller, Post, Body, Put, Req, Get, Param, Delete, BadRequestException, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post()
  async create (@Body(new ValidationPipe()) user: User) {
    user.password = bcrypt.hashSync(user.password, 10);
    return await this.userService.save(user);
  }

  @Put()
  async update (@Body(new ValidationPipe()) user: User, @Req() request: Request) {
    user.id = Number(request.headers.userid);
    return await this.userService.save(user);
  }

  @Get(':id')
  async findOne (@Param() id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new BadRequestException('Usuário enviado não encontrado');
    }
    return user;
  }

  @Delete(':id')
  async delete (@Param() id: number) {
    return await this.userService.delete(id);
  }
}

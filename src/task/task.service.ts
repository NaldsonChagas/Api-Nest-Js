import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor (private userService: UserService) {}

  @Cron('0 0 1 * *')
  handleCron () {
    this.userService.restoreMonthlyExpense();
  }
}

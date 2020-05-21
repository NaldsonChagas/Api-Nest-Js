import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TaskService]
})
export class TaskModule {}

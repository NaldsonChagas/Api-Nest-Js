import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseModule } from './purchase/purchase.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { InstallmentsModule } from './installments/installments.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { CsvModule } from './csv/csv.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EasyconfigModule.register({
      path: './.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      synchronize: true,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true
    }),
    PurchaseModule,
    CategoryModule,
    UserModule,
    InstallmentsModule,
    CsvModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

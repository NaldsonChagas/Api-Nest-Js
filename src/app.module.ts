import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase/purchase.service';
import { PurchaseModule } from './purchase/purchase.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { InstallmentsModule } from './installments/installments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      synchronize: true,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true
    }),
    PurchaseModule,
    CategoryModule,
    UserModule,
    InstallmentsModule
  ],
  controllers: [AppController],
  providers: [AppService, PurchaseService]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: '',
      synchronize: true,
      username: '',
      password: '',
      autoLoadEntities: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

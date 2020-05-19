import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installments } from './installments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Installments])
  ]
})
export class InstallmentsModule {}

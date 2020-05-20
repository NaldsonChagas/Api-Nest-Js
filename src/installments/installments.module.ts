import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installments } from './installments.entity';
import { InstallmentsService } from './installments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Installments])
  ],
  providers: [InstallmentsService],
  exports: [InstallmentsService]
})
export class InstallmentsModule {}

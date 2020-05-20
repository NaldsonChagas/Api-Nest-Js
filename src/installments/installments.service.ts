import { Injectable } from '@nestjs/common';
import { Installments } from './installments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/purchase/purchase.entity';

@Injectable()
export class InstallmentsService {
  constructor (@InjectRepository(Installments) private installmentsRepository:
  Repository<Installments>) {}

  save (purchase: Purchase, date: Date, installments: number): Promise<Installments> {
    const start: Date = date;
    const end: Date = new Date(
      new Date(date.getTime()).setMonth(date.getMonth() + installments)
    );

    return this.installmentsRepository.save({
      installments,
      start,
      end,
      purchase
    });
  }
}

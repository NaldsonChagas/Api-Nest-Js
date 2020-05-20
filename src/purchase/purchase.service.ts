import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PurchaseService {
  constructor (@InjectRepository(Purchase)
    private puchaseRepository: Repository<Purchase>) {}

  async save (purchase: Purchase): Promise<Purchase> {
    return this.puchaseRepository.save(purchase);
  }
}

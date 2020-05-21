import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Purchase } from './purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class PurchaseService {
  constructor (@InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>) {}

  async findByUser (user: User): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: {
        user
      },
      relations: ['category', 'installments']
    });
  }

  async findOne (id: number) {
    return this.purchaseRepository.findOne(id, {
      relations: ['installments']
    });
  }

  async save (purchase: Purchase): Promise<Purchase> {
    return this.purchaseRepository.save(purchase);
  }

  async delete (purchaseId: number): Promise<DeleteResult> {
    return this.purchaseRepository.delete(purchaseId);
  }
}

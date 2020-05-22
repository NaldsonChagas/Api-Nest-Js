import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Purchase } from './purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class PurchaseService {
  constructor (@InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>) {}

  findByUser (user: User): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: {
        user
      },
      relations: ['category', 'installments']
    });
  }

  async findByDate (date, user: User) {
    const purchases = await this.findByUser(user);
    return purchases.filter(purchase => {
      return purchase.date === date;
    });
  }

  findOne (id: number) {
    return this.purchaseRepository.findOne(id, {
      relations: ['installments']
    });
  }

  save (purchase: Purchase): Promise<Purchase> {
    return this.purchaseRepository.save(purchase);
  }

  delete (purchaseId: number): Promise<DeleteResult> {
    return this.purchaseRepository.delete(purchaseId);
  }
}

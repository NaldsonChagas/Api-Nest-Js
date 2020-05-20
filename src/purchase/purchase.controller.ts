import { Controller, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { InstallmentsService } from 'src/installments/installments.service';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { Purchase } from './purchase.entity';

@Controller('purchase')
export class PurchaseController {
  constructor (
    private purchaseService: PurchaseService,
    private installmentsService: InstallmentsService,
    private userService: UserService,
    private categoryService: CategoryService) {}

  @Post()
  async create (@Body(new ValidationPipe()) purchase, @Req() request: Request) {
    purchase.user = await this.userService
      .findOne(Number(request.headers.userid));

    purchase.category = await this.categoryService
      .findOne(purchase.category_id);

    const savedPurchase: Purchase = await this.purchaseService.save(purchase);
    return await this.installmentsService
      .save(savedPurchase, new Date(purchase.date + 'T00:00'), purchase.installments);
  }
}

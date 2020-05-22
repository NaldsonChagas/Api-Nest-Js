import { Controller, Post, Body, ValidationPipe, Req, Delete, Get, Param, Put, Res, InternalServerErrorException } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { InstallmentsService } from 'src/installments/installments.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { Purchase } from './purchase.entity';
import { User } from 'src/user/user.entity';
import { CsvService } from 'src/csv/csv.service';
import { Connection } from 'typeorm';

@Controller('purchase')
export class PurchaseController {
  constructor (
    private purchaseService: PurchaseService,
    private installmentsService: InstallmentsService,
    private userService: UserService,
    private categoryService: CategoryService,
    private csvService: CsvService,
    private connection: Connection) {}

  @Post()
  async create (@Body(new ValidationPipe()) purchase, @Req() request: Request) {
    purchase.user = await this.userService
      .findOne(Number(request.headers.userid));
    purchase.category = await this.categoryService
      .findOne(purchase.categoryId ?? 6);

    const expense = purchase.installments
      ? purchase.value / purchase.installments : purchase.value;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      this.userService.increaseMonthlyExpense(purchase.user, expense);
      const savedPurchase: Purchase = await this.purchaseService.save(purchase);
      if (purchase.installments) {
        await this.installmentsService
          .save(savedPurchase, new Date(purchase.date + 'T00:00'), purchase.installments);
      }
      queryRunner.commitTransaction();
      return savedPurchase;
    } catch (err) {
      queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Não foi possível concluir a solicitação'
      );
    }
  }

  @Get('/csv')
  async csv (@Req() request: Request, @Res() response: Response) {
    const user: User = await this.userService.findOne(
      Number(request.headers.userid)
    );
    const purchases = await this.purchaseService.findByUser(user);

    const header = 'Codigo;Titulo;Valor;Parcelas;Categoria;Data';
    const lines = purchases.map(purchase => purchase.toString());

    const csvPath = this.csvService
      .generateCsv(`${user.name}-${user.surname}`, header, lines);

    return response.download(csvPath);
  }

  @Get()
  async find (@Req() request: Request) {
    const userId = Number(request.headers.userid);
    const user: User = await this.userService.findOne(userId);
    return await this.purchaseService.findByUser(user);
  }

  @Get(':id')
  async findOne (@Param() id: number) {
    return await this.purchaseService.findOne(id);
  }

  @Get('search-by-date/:date')
  async findByDate (@Param('date') date: Date, @Req() request: Request) {
    const userId = Number(request.headers.userid);
    const user: User = await this.userService.findOne(userId);
    return this.purchaseService.findByDate(date, user);
  }

  @Put(':id')
  async update (@Body(new ValidationPipe()) purchase, @Req() request: Request) {
    purchase.id = Number(request.params.id);
    purchase.user = await this.userService.findOne(
      Number(request.headers.userid)
    );
    return this.purchaseService.save(purchase);
  }

  @Delete(':id')
  async delete (@Param() id: number) {
    const purchase = await this.purchaseService.findOne(id);
    return this.purchaseService.delete(purchase.id);
  }
}

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.findOne(+id);
  }

  @Post()
  create(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionsService.create(transaction);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionsService.update(+id, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.transactionsService.remove(+id);
  }
}
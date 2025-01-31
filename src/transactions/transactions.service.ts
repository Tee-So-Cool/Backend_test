import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) { }

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  findOne(transaction_id: number): Promise<Transaction> {
    return this.transactionsRepository.findOneOrFail({ where: { transaction_id } });
  }

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(transactionData);
    return this.transactionsRepository.save(transaction);
  }

  async update(transaction_id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    await this.transactionsRepository.update(transaction_id, transaction);
    return this.transactionsRepository.findOneOrFail({ where: { transaction_id } });
  }

  async remove(transaction_id: number): Promise<void> {
    await this.transactionsRepository.delete(transaction_id);
  }
}
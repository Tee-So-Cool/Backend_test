import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}

  findAll(): Promise<Wallet[]> {
    return this.walletsRepository.find();
  }

  findOne(wallet_id: number): Promise<Wallet> {
    return this.walletsRepository.findOneOrFail({ where: { wallet_id } });
  }

  async create(wallet: Partial<Wallet>): Promise<Wallet> {
    const newWallet = this.walletsRepository.create(wallet);
    return this.walletsRepository.save(newWallet);
  }

  async update(wallet_id: number, wallet: Partial<Wallet>): Promise<Wallet> {
    await this.walletsRepository.update(wallet_id, wallet);
    return this.walletsRepository.findOneOrFail({ where: { wallet_id } });
  }

  async remove(wallet_id: number): Promise<void> {
    await this.walletsRepository.delete(wallet_id);
  }
}
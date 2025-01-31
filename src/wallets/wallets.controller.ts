import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from './entities/wallet.entity';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  findAll(): Promise<Wallet[]> {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wallet> {
    return this.walletsService.findOne(+id);
  }

  @Post()
  create(@Body() wallet: Wallet): Promise<Wallet> {
    return this.walletsService.create(wallet);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() wallet: Wallet): Promise<Wallet> {
    return this.walletsService.update(+id, wallet);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletsService.remove(+id);
  }
}
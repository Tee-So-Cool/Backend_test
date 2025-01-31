import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { WalletsService } from '../src/wallets/wallets.service';
import { OrdersService } from '../src/orders/orders.service';
import { TransactionsService } from '../src/transactions/transactions.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const walletsService = app.get(WalletsService);
  const ordersService = app.get(OrdersService);
  const transactionsService = app.get(TransactionsService);

  try {
    // Create Users
    const user1 = await usersService.create({
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    });

    const user2 = await usersService.create({
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    });

    // Create Wallets
    const wallet1 = await walletsService.create({
      user_id: user1.user_id,
      currency_type: 'BTC',
      balance: 1.5,
    });

    const wallet2 = await walletsService.create({
      user_id: user2.user_id,
      currency_type: 'BTC',
      balance: 0.5,
    });

    // Create Orders
    const order1 = await ordersService.create({
      user_id: user1.user_id,
      order_type: 'SELL',
      currency_type: 'BTC',
      amount: 0.5,
      price: 30000,
      status: 'PENDING',
    });

    // Create Transactions
    const transaction1 = await transactionsService.create({
      from_wallet_id: wallet1.wallet_id,
      to_wallet_id: wallet2.wallet_id,
      amount: 0.5,
      transaction_type: 'TRANSFER',
      order_id: order1,
    });

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
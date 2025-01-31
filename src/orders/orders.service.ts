import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(order_id: number): Promise<Order> {
    return this.ordersRepository.findOneOrFail({ where: { order_id } });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.ordersRepository.create(order);
    return this.ordersRepository.save(newOrder);
  }

  async update(order_id: number, order: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(order_id, order);
    return this.ordersRepository.findOneOrFail({ where: { order_id } });
  }

  async remove(order_id: number): Promise<void> {
    await this.ordersRepository.delete(order_id);
  }
}
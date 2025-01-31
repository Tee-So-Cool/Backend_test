import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User, (user) => user.order_id)
  user_id: number;

  @Column()
  order_type: string;

  @Column()
  currency_type: string;

  @Column('decimal', { precision: 18, scale: 8 })
  amount: number;

  @Column('decimal', { precision: 18, scale: 8 })
  price: number;

  @Column()
  status: string;

  @OneToOne(() => Transaction, (transaction) => transaction.order_id)
  transaction_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
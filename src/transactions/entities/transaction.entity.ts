import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Wallet } from '../../wallets/entities/wallet.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.sent_transactions)
  from_wallet_id: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.received_transactions)
  to_wallet_id: number;

  @Column('decimal', { precision: 18, scale: 8 })
  amount: number;

  @Column()
  transaction_type: string;

  @ManyToOne(() => Order, (order) => order.transaction_id)
  order_id: Order;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
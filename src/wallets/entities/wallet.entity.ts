import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  wallet_id: number;

  @ManyToOne(() => User, (user) => user.wallet_id)
  user_id: number;

  @Column()
  currency_type: string;

  @Column('decimal', { precision: 18, scale: 8 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.from_wallet_id)
  sent_transactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.to_wallet_id)
  received_transactions: Transaction[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('numeric', { unique: true })
  accountNumber: number;

  @Column()
  accountName: string;

  @Column('numeric', { default: 0 })
  accountAmount: number;
  
  @Column('numeric')
  clientId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

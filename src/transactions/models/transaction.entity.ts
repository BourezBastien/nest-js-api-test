import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class TransactionsEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty() 
  uuid: string;

  @Column('numeric')
  @ApiProperty({
    required: true,
    description: 'The is account number that requested the transaction',
  })
  @Length(8, 8)
  accountNumber: number;


  @Column('numeric')
  @Length(11, 11)
  @ApiProperty({
    required: true,
    description: 'The is clientId that requested the transaction',
  })
  clientId: number;


  @Column()
  @ApiHideProperty()
  TransactionType: string;

  @Column('numeric')
  @ApiProperty({
    required: true,
    description: 'The is account transaction amount',
  })
  transactionAmount: number;


  @Column()
  @ApiHideProperty()
  TransactionStatus: string;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiHideProperty()
  createdAt: Date;
}

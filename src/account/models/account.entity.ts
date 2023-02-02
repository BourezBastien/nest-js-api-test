import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {

  @PrimaryGeneratedColumn("uuid")
  @ApiHideProperty()
  uuid: string;


  @Column('numeric', { unique: true })
  @ApiProperty({ description: 'The is unique number of bank account' })
  @Length(8, 8)
  accountNumber: number;

  @Column()
  @ApiProperty({ description: 'The is type of account' })
  accountType: string;

 
  @Column('numeric', { default: 0 })
  @ApiHideProperty()
  accountAmount: number;


  @Column('numeric')
  @ApiProperty({ description: 'This is the client number of the person who holds this account' })
  @Length(11, 11)
  clientId: number;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiHideProperty()
  createdAt: Date;
}

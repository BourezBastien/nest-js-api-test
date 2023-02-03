import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/account/models/account.entity';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionsEntity } from './models/transaction.entity';
import { TransactionsService } from './services/transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsEntity, AccountEntity])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { AccountEntity } from 'src/account/models/account.entity';
import { Repository } from 'typeorm';
import { TransactionsEntity } from '../models/transaction.entity';
import { Transactions } from '../models/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async createTransaction(transaction: Transactions, id: number) {
    const balance = await this.accountRepository.findOne({
      where: { accountNumber: id },
    });
    return balance.accountAmount != 0
      ? this.transactionsRepository.save(transaction)
      : 'Error: the action has been refused you do not have the necessary funds';
  }

  findAllTransaction(): Observable<TransactionsEntity[]> {
    return from(this.transactionsRepository.find());
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { TransactionsEntity } from '../models/transaction.entity';
import { Transactions } from '../models/transactions.interface';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionsRepository: Repository<TransactionsEntity>,
      ) {}

      createTransaction(transaction: Transactions): Observable<TransactionsEntity> {
        return from(this.transactionsRepository.save(transaction));
      }
}

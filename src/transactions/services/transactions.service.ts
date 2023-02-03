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

  async createDebitTransaction(transaction: Transactions) {
    return await this.checkDebitTransaction(transaction);
  }


  findAllTransaction(): Observable<TransactionsEntity[]> {
    return from(this.transactionsRepository.find());
  }

  async findTransactionByIsId(uuid: string): Promise<TransactionsEntity> {
    return await this.transactionsRepository.findOne({ where: { uuid } });
  }

  async checkDebitTransaction(transaction: Transactions) {
    const bankAccount = await this.accountRepository.findOne({
      where: { accountNumber: transaction.accountNumber },
    });

    if (!bankAccount) return 'the account number cannot be found.';
    if (bankAccount.accountAmount === 0)
      return 'you do not have the necessary funds.';
    if (transaction.transactionAmount === 0)
      return 'please provide valide transaction amount.';
    if (bankAccount.accountAmount < transaction.transactionAmount)
      return 'you do not have the necessary funds.';

    if (transaction.transactionAmount > 5000) {
      this.transactionsRepository.save({ 
        accountNumber: transaction.accountNumber,
        clientId: transaction.clientId,
        transactionAmount: transaction.transactionAmount,
        TransactionType: "DEBIT",
        TransactionStatus: 'IDLE',
       });
      return 'A validation request for your application has just been sent to your consultant ';
    }
    this.transactionsRepository.save({
      accountNumber: transaction.accountNumber,
      clientId: transaction.clientId,
      transactionAmount: transaction.transactionAmount,
      TransactionType: "DEBIT",
      TransactionStatus: 'ACCEPTED',
    });
    this.accountRepository.update(bankAccount.uuid, {
      accountAmount: bankAccount.accountAmount - transaction.transactionAmount,
    });

    return `The amount ${transaction.transactionAmount} has been withdrawn from your account ${bankAccount.accountType}`;
  }
}

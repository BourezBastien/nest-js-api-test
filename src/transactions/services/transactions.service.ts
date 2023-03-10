import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { AccountEntity } from '../../account/models/account.entity';
import { Repository, UpdateResult } from 'typeorm';
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

  async createCreditTransaction(transaction: Transactions) {
    return transaction.transactionAmount <= 2000
      ? this.createTransaction(transaction, 'CREDIT', 'ACCEPTED')
      : this.createTransaction(transaction, 'CREDIT', 'IDLE');
  }

  async createTransfertTransaction(
    transaction: Transactions,
    bank_account_number: number,
  ) {
    return await this.checkTransfertTransaction(
      transaction,
      bank_account_number,
    );
  }

  findAllTransaction(): Promise<TransactionsEntity[]> {
    return this.transactionsRepository.find();
  }

  async findTransactionByIsId(uuid: string): Promise<TransactionsEntity> {
    return await this.transactionsRepository.findOne({ where: { uuid } });
  }

  async findByStatus(statusOfTransaction: string) {
    if (statusOfTransaction === 'ACCPETED' || 'REFUSED' || 'IDLE' || 'CANCELED')
      return await this.transactionsRepository.find({
        where: { TransactionStatus: statusOfTransaction.toUpperCase() },
      });
    return 'Error: Type are only ACCEPTED, REFUSED, IDLE, CANCELED';
  }

  async findByAccountNumber(
    accountNumber: number,
  ): Promise<TransactionsEntity[]> {
    return await this.transactionsRepository.find({ where: { accountNumber } });
  }

  async AcceptById(transaction_uuid: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: { uuid: transaction_uuid },
    });
    return transaction.TransactionStatus === 'IDLE'
      ? from(
          this.transactionsRepository.update(transaction_uuid, {
            TransactionStatus: 'ACCEPTED',
          }),
        )
      : 'Error: please privide and uuid of transaction type idle.';
  }

  async refusalById(transaction_uuid: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: { uuid: transaction_uuid },
    });
    return transaction.TransactionStatus === 'IDLE'
      ? from(
          this.transactionsRepository.update(transaction_uuid, {
            TransactionStatus: 'REFUSED',
          }),
        )
      : 'Error: please privide and uuid of transaction type idle.';
  }

  async cancelById(transaction_uuid: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: { uuid: transaction_uuid },
    });
    return transaction.TransactionStatus === 'IDLE'
      ? from(
          this.transactionsRepository.update(transaction_uuid, {
            TransactionStatus: 'CANCELED',
          }),
        )
      : 'Error: please privide and uuid of transaction type idle.';
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
      this.createTransaction(transaction, 'DEBIT', 'IDLE');
      return 'A validation request for your application has just been sent to your consultant';
    }
    this.createTransaction(transaction, 'DEBIT', 'ACCEPTED');
    this.accountRepository.update(bankAccount.uuid, {
      accountAmount: bankAccount.accountAmount - transaction.transactionAmount,
    });

    return `The amount ${transaction.transactionAmount} has been withdrawn from your account ${bankAccount.accountType}`;
  }

  async checkTransfertTransaction(
    transaction: Transactions,
    bank_account_number: number,
  ) {
    const bankAccountToTransfert = await this.accountRepository.findOne({
      where: { accountNumber: bank_account_number },
    });

    const bankAccount = await this.accountRepository.findOne({
      where: { accountNumber: transaction.accountNumber },
    });

    if (
      !bankAccountToTransfert ||
      bankAccountToTransfert === null ||
      bankAccountToTransfert === undefined
    )
      return 'Error: please provide valid account number';
    if (!bankAccount || bankAccount === null || bankAccount === undefined)
      return 'Error: please provide valid account number';
    if (transaction.accountNumber == bankAccountToTransfert.accountNumber)
      return "Error: you can't send money to your same account !";
    if (bankAccount.accountAmount < transaction.transactionAmount)
      return "Error: you don't have founds for this transfert";

    this.accountRepository.update(bankAccount.uuid, {
      accountAmount:
        Number(bankAccount.accountAmount) -
        Number(transaction.transactionAmount),
    });

    this.accountRepository.update(bankAccountToTransfert.uuid, {
      accountAmount:
        Number(bankAccountToTransfert.accountAmount) +
        Number(transaction.transactionAmount),
    });

    this.createTransaction(transaction, 'TRANSFERT', 'ACCEPTED', bankAccountToTransfert.accountNumber)

    return `You have sent ${transaction.transactionAmount}??? to bank account n??${bankAccountToTransfert.accountNumber}`;
    
  }
  async createTransaction(
    transaction: Transactions,
    Type: String,
    Status: string,
    AccountToSend?: number
  ) {
    this.transactionsRepository.save({
      accountNumber: transaction.accountNumber,
      clientId: transaction.clientId,
      transactionAmount: transaction.transactionAmount,
      TransactionType: `${Type}`,
      AccountToSend: AccountToSend,
      TransactionStatus: `${Status}`,
    });

    if (Type === 'CREDIT' && Status === 'ACCEPTED') {
      const bankAccount = await this.accountRepository.findOne({
        where: { accountNumber: transaction.accountNumber },
      });

      const newAmount: number =
        Number(bankAccount.accountAmount) +
        Number(transaction.transactionAmount);

      this.accountRepository.update(bankAccount.uuid, {
        accountAmount: newAmount,
      });

      return `the amount ${transaction.transactionAmount}??? has been added to your account with number ${transaction.accountNumber}`;
    }
    if (Type === 'CREDIT' || ('DEBIT' && Status === 'IDLE'))
      return `A validation request for your application has just been sent to your consultant`;
  }
}

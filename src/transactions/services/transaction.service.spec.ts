import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../../account/models/account.entity';
import { AccountService } from '../../account/services/account.service';
import { Repository } from 'typeorm';
import { TransactionsEntity } from '../models/transaction.entity';
import { Transactions } from '../models/transactions.interface';
import { TransactionsService } from './transactions.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity)
}));

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repositoryMock: MockType<Repository<TransactionsEntity>>;

  const d: Date = new Date();
  const transaction: Transactions = {
    uuid: "dc06eb5d-f8a9-4826-bca9-914845239ae1",
    accountNumber: 12345,
    clientId: 12345678911,
    TransactionType: "DEBIT",
    transactionAmount: 10,
    TransactionStatus: "IDLE",
    createdAt: d,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(TransactionsEntity),
          useFactory: repositoryMockFactory,
        },
        AccountService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(AccountEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<TransactionsService>(TransactionsService);
    repositoryMock = module.get(getRepositoryToken(TransactionsEntity));
  });

  it('should create new DEBIT transaction', async () => {
    repositoryMock.save.mockReturnValue(transaction);
    expect(service.createDebitTransaction(transaction));
  });

  it('should create new CREDIT transaction', async () => {
    repositoryMock.save.mockReturnValue(transaction);
    expect(service.createCreditTransaction(transaction));
  });

  it('should create new TRANSFERT transaction', async () => {
    repositoryMock.save.mockReturnValue(transaction);
    expect(service.createTransfertTransaction(transaction, 66525762701));
  });

  it('should find all transactions', async () => {
    repositoryMock.find.mockReturnValue(transaction);
    expect(await service.findAllTransaction());
  });

  it('should find transactions by account number', async () => {
    repositoryMock.find.mockReturnValue(transaction);
    expect(service.findByAccountNumber(transaction.accountNumber));
  });

  it('should find transactions by is id', async () => {
    repositoryMock.find.mockReturnValue(transaction);
    expect(service.findTransactionByIsId(transaction.uuid));
  });

  it('should find transaction by status', async () => {
    repositoryMock.find.mockReturnValue(transaction);
    expect(service.findByStatus("IDLE"));
  });

  it('should cancel transaction by is id', async () => {
    repositoryMock.update.mockReturnValue(transaction);
    expect(service.cancelById(transaction.uuid));
  });

  it('should accept transaction by is id', async () => {
    repositoryMock.update.mockReturnValue(transaction);
    expect(service.AcceptById(transaction.uuid));
  });

  it('should not accept transaction by is id', async () => {
    repositoryMock.update.mockReturnValue(transaction);
    expect(service.refusalById(transaction.uuid));
  });
  

});

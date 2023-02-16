import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../../account/models/account.entity';
import { AccountService } from '../../account/services/account.service';
import { Repository } from 'typeorm';
import { Account } from '../models/account.interface';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/models/user.entity';

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

describe('AccountService', () => {
  let service: AccountService;
  let repositoryMock: MockType<Repository<AccountEntity>>;

  const d: Date = new Date();
  const account: Account = {
    uuid: "cd190438-0a8f-46ca-bb0b-f25be7b8d1cc",
    accountNumber: 34783951935,
    accountType: "Livret a",
    accountAmount: 0,
    clientId: 13410261,
    createdAt: d,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(AccountEntity),
          useFactory: repositoryMockFactory,
        },
        UserService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<AccountService>(AccountService);
    repositoryMock = module.get(getRepositoryToken(AccountEntity));
  });

  it('should create new bank account type', async () => {
    repositoryMock.save.mockReturnValue(account);
    expect(service.createAccount(account));
  });

  it('should find all bank accounts type', async () => {
    repositoryMock.find.mockReturnValue(account);
    expect(service.findAllAccount());
  });

  it('should find bank account type by is uuid', async () => {
    repositoryMock.find.mockReturnValue(account);
    expect(service.findAccountByIsId(account.uuid));
  });

  it('should find bank account type by client id', async () => {
    repositoryMock.find.mockReturnValue(account);
    expect(service.findAccountByClientId(account.clientId));
  });

  it('should update bank account type by is uuid', async () => {
    repositoryMock.find.mockReturnValue(account);
    expect(service.updateAccount(account.uuid, account));
  });

  it('should delete bank account type by is uuid', async () => {
    repositoryMock.find.mockReturnValue(account);
    expect(service.deleteAccount(account.uuid));
  });
});

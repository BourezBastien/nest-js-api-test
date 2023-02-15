// import { Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AccountEntity } from '../../account/models/account.entity';
// import { AccountService } from '../../account/services/account.service';
// import { UserController } from '../controllers/user.controller';
// import { UserEntity } from '../models/user.entity';
// import { UserService } from './user.service';
// describe('UserController', () => {
//   let controller: UserController;
//   let service: UserService;

//   const mockUserRepository = {
//     save: jest.fn().mockImplementation((entity: Repository<UserEntity>) => {
//       return Promise.resolve({
//         ...entity,
//       });
//     }),
//   };

//   const mockAccountRepository = {
//     save: jest.fn().mockImplementation((entity: Repository<AccountEntity>) => {
//       return Promise.resolve({
//         ...entity,
//       });
//     }),
//   };

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(UserEntity),
//           useValue: mockUserRepository,
//         },
//         AccountService,
//         {
//             provide: getRepositoryToken(AccountEntity),
//             useValue: mockAccountRepository,
//         }
//       ],
//     }).compile();

//     controller = moduleRef.get(UserController);
//     service = moduleRef.get(UserService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return an array of all customers', async () => {
//       expect(service.findAllUser());
//     });
//   });

// });

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserService } from './user.service';
import { User } from '../models/user.interface';

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

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<UserEntity>>;

  const d: Date = new Date();
  const user: User = {
    uuid: 'dc06eb5d-f8a9-4826-bca9-914845239ae1',
    clientId: 31544091,
    clientFirstName: 'Jean-michel',
    clientLastName: 'Fontaine',
    createdAt: d,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should create new user', async () => {
    repositoryMock.save.mockReturnValue(user);
    expect(service.createUser(user)).toEqual(user);
  });

  it('should find a user by is uuid', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.findOne.mockReturnValue(user);
    expect(await service.findById(user.uuid)).toEqual(user);
  });

  it('should find a user by client id', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.find.mockReturnValue(user);
    expect(await service.findUsertByClientId(user.clientId)).toEqual(user);
  });

  it('should update a user by is id', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.update.mockReturnValue(user);
    expect(
      service.updateUser(user.uuid, {
        clientFirstName: 'Batien',
        clientLastName: 'Bourez',
      }),
    ).toEqual(user);
  });
  

  it('should delete a user by is id', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.delete.mockReturnValue(user);
    expect(
      service.deleteUser(user.uuid)).toEqual(user);
  });


  it("should find user's ", async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.find.mockReturnValue(user);
    expect(await service.findUsertByClientId(user.clientId)).toEqual(user); 
  });

});

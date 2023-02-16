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


  it("should find user by is client id", async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.find.mockReturnValue(user);
    expect(await service.findUsertByClientId(user.clientId)).toEqual(user); 
  });

});

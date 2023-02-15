import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AccountEntity } from '../../account/models/account.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  createUser(client: User) {
    return this.userRepository.save(client);
  }

  findAllUser(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  async findById(uuid: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { uuid } });
  }

  updateUser(id: string, client: User) {
    console.log(`UPDATE: User with id ${id} has been updated`);
    return this.userRepository.update(id, client);
  }

  deleteUser(id: string) {
    console.log(`DELETE: User with id ${id} has been deleted`);
    return this.userRepository.delete(id);
  }

  async findUsertByClientId(id: number): Promise<AccountEntity[]> {
    return await this.accountRepository.find({ where: { clientId: id } });
  }
  
}
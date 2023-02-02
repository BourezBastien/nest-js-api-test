import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AccountEntity } from 'src/account/models/account.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}
 
  createUser(client: User): Observable<UserEntity> {
    return from(this.userRepository.save(client));
  }

  findAllUser(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  async findById(uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { uuid } });
  }

  updateUser(id: string, client: User): Observable<UpdateResult> {
    return from(this.userRepository.update(id, client));
  }

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  async findAccountByClientId(id: number): Promise<AccountEntity[]> {
    return await this.accountRepository.find({where: {clientId: id }})
  }
}

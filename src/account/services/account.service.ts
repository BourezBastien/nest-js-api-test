import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { Account } from '../models/account.interface';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  createAccount(account: Account): Observable<AccountEntity> {
    return from(this.accountRepository.save(account));
  }

  findAllAccount(): Observable<AccountEntity[]> {
    return from(this.accountRepository.find());
  }

  async findAccountByIsId(uuid: string): Promise<AccountEntity> {
    return await this.accountRepository.findOne({where: {uuid}});
  }
  async findAccountByClientId(id: number): Promise<AccountEntity[]> {
    return await this.accountRepository.find({where: {clientId: id }})
  }
  
  updateUser(id: string, account: Account): Observable<UpdateResult> {
    return from(this.accountRepository.update(id, account));
  }

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this.accountRepository.delete(id));
  }

}

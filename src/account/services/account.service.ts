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

  createAccount(account: Account): Promise<AccountEntity> {
    return this.accountRepository.save(account);
  }

  findAllAccount(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  async findAccountByIsId(uuid: string): Promise<AccountEntity> {
    return await this.accountRepository.findOne({where: {uuid}});
  }
  async findAccountByClientId(id: number): Promise<AccountEntity[]> {
    return await this.accountRepository.find({where: {clientId: id }})
  }
  
  updateAccount(uuid: string, account: Account): Observable<UpdateResult> {
    return from(this.accountRepository.update(uuid, account));
  }

  deleteAccount(uuid: string): Observable<DeleteResult> {
    return from(this.accountRepository.delete(uuid));
  }

}

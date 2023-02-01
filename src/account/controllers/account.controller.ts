import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { Account } from '../models/account.interface';
import { AccountService } from '../services/account.service';

@Controller('account')
@ApiTags('Account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  create(@Body() account: Account): Observable<AccountEntity> {
    return this.accountService.createAccount(account);
  }

  @Get()
  findAll(): Observable<AccountEntity[]> {
    return this.accountService.findAllAccount();
  }

  @Get(':id')
  findByIsId(@Param('id') id: string): Promise<AccountEntity>{
    return this.accountService.findAccountByIsId(id);
  } 

  @Get('/client/:id')
  findByClientId(@Param('id') id: number): Promise<AccountEntity[]>{
    return this.accountService.findAccountByClientId(id);
  } 

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() account: Account,
  ): Observable<UpdateResult> {
    return this.accountService.updateUser(id, account);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<DeleteResult> {
    return this.accountService.deleteUser(id);
  }
}

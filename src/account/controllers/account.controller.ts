import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { Account } from '../models/account.interface';
import { AccountService } from '../services/account.service';

@Controller('bank_accounts')
@ApiTags('Bank Account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  @ApiBody({type: AccountEntity})
  @ApiOperation({ summary: 'Create new bank account type for user' })
  create(@Body() account: Account): Promise<AccountEntity> {
    return this.accountService.createAccount(account);
  }

  @Get()
  @ApiOperation({ summary: 'Find all bank accounts' })
  findAll(): Promise<AccountEntity[]> {
    return this.accountService.findAllAccount();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find bank account by is uuid' })
  findByIsId(@Param('uuid') uuid: string): Promise<AccountEntity>{
    return this.accountService.findAccountByIsId(uuid);
  } 

  @Get('/client/:id')
  @ApiOperation({ summary: 'Find bank account using client id' })
  findByClientId(@Param('id') id: number): Promise<AccountEntity[]>{
    return this.accountService.findAccountByClientId(id);
  } 

  @Put(':uuid')
  @ApiOperation({ summary: 'Update bank account by is uuid' })
  update(
    @Param('uuid') uuid: string,
    @Body() account: Account,
  ): Observable<UpdateResult> {
    return this.accountService.updateAccount(uuid, account);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete bank acount by is uuid' })
  delete(@Param('uuid') uuid: string): Observable<DeleteResult> {
    return this.accountService.deleteAccount(uuid);
  }
}

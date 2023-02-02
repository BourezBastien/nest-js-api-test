import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { Account } from '../models/account.interface';
import { AccountService } from '../services/account.service';

@Controller('accounts')
@ApiTags('Account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  @ApiBody({type: AccountEntity})
  @ApiOperation({ summary: 'Create new bank account type for user' })
  create(@Body() account: Account): Observable<AccountEntity> {
    return this.accountService.createAccount(account);
  }

  @Get()
  @ApiOperation({ summary: 'Find all bank accounts' })
  findAll(): Observable<AccountEntity[]> {
    return this.accountService.findAllAccount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find bank account by is id' })
  findByIsId(@Param('id') id: string): Promise<AccountEntity>{
    return this.accountService.findAccountByIsId(id);
  } 

  @Get('/client/:id')
  @ApiOperation({ summary: 'Find bank account of user by is id' })
  findByClientId(@Param('id') id: number): Promise<AccountEntity[]>{
    return this.accountService.findAccountByClientId(id);
  } 

  @Put(':id')
  @ApiOperation({ summary: 'Update bank account by is id' })
  update(
    @Param('id') id: string,
    @Body() account: Account,
  ): Observable<UpdateResult> {
    return this.accountService.updateUser(id, account);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bank acount by is id' })
  delete(@Param('id') id: string): Observable<DeleteResult> {
    return this.accountService.deleteUser(id);
  }
}

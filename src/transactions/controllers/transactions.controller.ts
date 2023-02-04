import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { TransactionsEntity } from '../models/transaction.entity';
import { Transactions } from '../models/transactions.interface';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post('/debit')
  @ApiOperation({ summary: 'Create new debit transaction' })
  @ApiBody({ type: TransactionsEntity })
  createDebit(@Body() transaction: Transactions) {
    return this.transactionService.createDebitTransaction(transaction);
  }
  @Post('/credit')
  @ApiOperation({ summary: 'Create new credit transaction' })
  @ApiBody({ type: TransactionsEntity })
  createCredit(@Body() transaction: Transactions) {
    return this.transactionService.createCreditTransaction(transaction);
  }

  @Get()
  @ApiOperation({ summary: 'Find all transactions' })
  findAll(): Observable<TransactionsEntity[]> {
    return this.transactionService.findAllTransaction();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find transaction by is uuid' })
  findByIsId(@Param('uuid') uuid: string): Promise<TransactionsEntity> {
    return this.transactionService.findTransactionByIsId(uuid);
  }

  @Get('/status/:status')
  @ApiOperation({ summary: 'Find transactions by status' })
  findByStatus(@Param('status') status: string) {
    return this.transactionService.findByStatus(status);
  }

  @Get('/bank_account/:number')
  @ApiOperation({ summary: 'Find transactions by status' })
  findByAccountNumber(@Param('number') accountNumber: number) {
    return this.transactionService.findByAccountNumber(accountNumber);
  }

  @Put('/validation/:transaction_uuid')
  @ApiOperation({ summary: 'Accept an transaction using is unique id' })
  AcceptById(
    @Param('transaction_uuid') transaction_uuid: string
  ) {
    return this.transactionService.AcceptById(transaction_uuid);
  }


  @Put('/refusal/:transaction_uuid')
  @ApiOperation({ summary: 'Refusal an transaction using is unique id' })
  refusalById(
    @Param('transaction_uuid') transaction_uuid: string
  ) {
    return this.transactionService.refusalById(transaction_uuid);
  }

  @Put('/cancel/:transaction_uuid')
  @ApiOperation({ summary: 'Cancel an transaction using is unique id' })
  cancelById(
    @Param('transaction_uuid') transaction_uuid: string
  ) {
    return this.transactionService.cancelById(transaction_uuid);
  }

}

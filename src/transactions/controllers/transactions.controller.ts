import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TransactionsEntity } from '../models/transaction.entity';
import { Transactions } from '../models/transactions.interface';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  // TODO: add transfert
  // TODO: add bank account and transaction info inside get user request

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
  
  @Post('/transfert/:number')
  @ApiOperation({ summary: 'Transfert money to other user using is account number' })
  @ApiBody({ type: TransactionsEntity })
  transfert(@Body() transaction: Transactions, @Param('number') bank_account_number: number) {
    return this.transactionService.createTransfertTransaction(transaction, bank_account_number);
  }

  @Get()
  @ApiOperation({ summary: 'Find all transactions' })
  findAll(): Promise<TransactionsEntity[]> {
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

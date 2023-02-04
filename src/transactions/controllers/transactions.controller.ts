import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
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

  // TODO: add find transaction by type and status. 


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
  @ApiOperation({ summary: 'Find transactions by status'})
  findByStatus(@Param('status') status: string) {
    return this.transactionService.findByStatus(status);
  }
}

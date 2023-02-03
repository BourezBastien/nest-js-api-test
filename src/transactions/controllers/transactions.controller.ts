import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  create(@Body() transaction: Transactions) {
    return this.transactionService.createDebitTransaction(transaction);
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
}

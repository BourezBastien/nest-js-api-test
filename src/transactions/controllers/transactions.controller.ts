import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TransactionsEntity } from '../models/transaction.entity';
import { Transactions } from '../models/transactions.interface';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new transactions' })
  @ApiBody({ type: TransactionsEntity })
  create(@Body() transaction: Transactions) {
    return this.transactionService.createTransaction(
      transaction,
      transaction.accountNumber,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Find all transactions' })
  findAll(): Observable<TransactionsEntity[]> {
    return this.transactionService.findAllTransaction();
  }
}

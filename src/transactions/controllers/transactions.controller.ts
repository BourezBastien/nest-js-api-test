import { Body, Controller, Post } from '@nestjs/common';
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
  create(@Body() transaction: Transactions): Observable<TransactionsEntity> {
    return this.transactionService.createTransaction(transaction);
  }
}
function Serialize() {
  throw new Error('Function not implemented.');
}
function ApiModelProperty() {
  throw new Error('Function not implemented.');
}


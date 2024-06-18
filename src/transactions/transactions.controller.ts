import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDTO } from './transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions() {
    return this.transactionsService.getTransactions();
  }

  @Post()
  createTransaction(@Body() transaction: TransactionDTO) {
    return this.transactionsService.createTransaction(transaction);
  }
}

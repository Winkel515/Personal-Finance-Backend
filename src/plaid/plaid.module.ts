import { Module } from '@nestjs/common';
import { LinkTokenController } from './link-token/link-token.controller';
import { PlaidService } from './plaid.service';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  controllers: [LinkTokenController, TransactionController],
  providers: [PlaidService],
})
export class PlaidModule {}

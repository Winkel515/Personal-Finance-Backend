import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { LinkTokenController } from './link-token/link-token.controller';
import { PlaidService } from './plaid.service';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [DbModule],
  controllers: [LinkTokenController, TransactionController],
  providers: [PlaidService],
})
export class PlaidModule {}

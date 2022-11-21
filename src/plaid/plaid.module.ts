import { Module } from '@nestjs/common';
import { LinkTokenController } from '../link/link.controller';
import { PlaidService } from './plaid.service';
import { TransactionController } from '../transaction/transaction.controller';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [LinkTokenController, TransactionController],
  providers: [PlaidService, DbService],
})
export class PlaidModule {}

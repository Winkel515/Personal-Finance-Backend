import { Controller, Get, Param } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PlaidService } from 'src/plaid/plaid.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private plaidService: PlaidService,
    private dbService: DbService,
  ) {}

  @Get('/:id')
  async getTransactions(@Param('id') id) {
    const accessTokens = await this.dbService.getAccessTokens(id);

    const transaction = await this.plaidService.getTransactions(
      accessTokens[0],
    );

    return transaction;
  }
}

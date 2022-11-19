import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PlaidApi, Configuration, PlaidEnvironments } from 'plaid';

dotenv.config();

const { PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV = 'sandbox' } = process.env;

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

@Injectable()
export class PlaidService {
  private readonly plaidClient = new PlaidApi(configuration);

  getPlaidClient() {
    return this.plaidClient;
  }
}

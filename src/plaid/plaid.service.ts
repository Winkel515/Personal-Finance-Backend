import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { PlaidApi, Configuration, PlaidEnvironments } from 'plaid';
import { PG_CONNECTION } from 'src/constants';

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
  constructor(
    @Inject(PG_CONNECTION)
    private conn: Pool,
  ) {}

  private readonly plaidClient = new PlaidApi(configuration);

  getPlaidClient() {
    return this.plaidClient;
  }

  async getUsers() {
    const res = await this.conn.query('SELECT * FROM "user"');
    console.log(res);
    return res.rows;
  }
  // async setAccessToken() {

  // }
}

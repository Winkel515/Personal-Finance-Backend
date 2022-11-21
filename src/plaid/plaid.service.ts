import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import {
  PlaidApi,
  Configuration,
  PlaidEnvironments,
  LinkTokenCreateRequest,
  Products,
  CountryCode,
  TransactionsGetRequest,
} from 'plaid';
import { DbService } from 'src/db/db.service';

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
  constructor(private dbService: DbService) {}
  private readonly plaidClient = new PlaidApi(configuration);

  async getLinkToken(userId: string) {
    const request: LinkTokenCreateRequest = {
      user: {
        client_user_id: userId.toString(),
      },
      client_name: 'Plaid Quickstart',
      products: [Products.Transactions],
      country_codes: [CountryCode.Ca],
      language: 'en',
    };

    const response = await this.plaidClient.linkTokenCreate(request);
    return response.data.link_token;
  }

  async setAccessToken(userId: string, publicToken: string) {
    try {
      const tokenResponse = await this.plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });

      const { access_token } = tokenResponse.data;

      await this.dbService.setAccessToken(userId, access_token);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getTransactions(accessToken: string) {
    const request: TransactionsGetRequest = {
      access_token: accessToken,
      start_date: '2022-01-01',
      end_date: '2022-12-31',
    };
    const response = await this.plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;
    const total_transactions = response.data.total_transactions;
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    while (transactions.length < total_transactions) {
      const paginatedRequest: TransactionsGetRequest = {
        access_token: accessToken,
        start_date: '2022-01-01',
        end_date: '2022-12-31',
        options: {
          offset: transactions.length,
        },
      };
      const paginatedResponse = await this.plaidClient.transactionsGet(
        paginatedRequest,
      );

      transactions = transactions.concat(paginatedResponse.data.transactions);
    }
    return transactions.map((x) => {
      const { amount, name, date, category } = x;
      return { amount, name, date, category };
    });
  }
}

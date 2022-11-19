import { Controller, Get, Post, Req } from '@nestjs/common';
import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid';
import { PlaidService } from '../plaid.service';

@Controller('link-token')
export class LinkTokenController {
  constructor(private plaidService: PlaidService) {}

  @Get()
  async getLinkToken() {
    const plaidClient = this.plaidService.getPlaidClient();

    const request: LinkTokenCreateRequest = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: 'user-id',
      },
      client_name: 'Plaid Quickstart',
      products: [Products.Transactions],
      country_codes: [CountryCode.Ca],
      language: 'en',
    };

    const response = await plaidClient.linkTokenCreate(request);
    return response.data;
  }

  @Post()
  async setAccessToken(@Req() req) {
    const plaidClient = this.plaidService.getPlaidClient();

    const { public_token } = req.body;
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const { access_token } = tokenResponse.data;

    console.log(access_token);

    return {
      message: 'success',
    };
  }
}

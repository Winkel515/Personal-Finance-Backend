import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlaidService } from '../plaid/plaid.service';

@Controller('link')
export class LinkTokenController {
  constructor(private plaidService: PlaidService) {}

  @Get('/getToken/:id')
  async getLinkToken(@Param('id') id) {
    return {
      link_token: await this.plaidService.getLinkToken(id),
    };
  }

  @Post('/setAccessToken')
  async setAccessToken(@Body() body) {
    const { userId, public_token } = body;
    await this.plaidService.setAccessToken(userId, public_token);
    return { message: 'Success' };
  }
}

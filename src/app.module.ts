import { Module } from '@nestjs/common';
import { PlaidModule } from './plaid/plaid.module';
@Module({
  imports: [PlaidModule],
})
export class AppModule {}

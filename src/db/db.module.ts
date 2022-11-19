import { Module, Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';
import 'dotenv/config';

const dbProvider: Provider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}

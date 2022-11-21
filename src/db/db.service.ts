import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService {
  private readonly db = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  async getAccessTokens(userId: string) {
    const result = await this.db.query({
      text: 'SELECT token FROM access_token WHERE user_id = $1',
      values: [userId],
    });

    return result.rows.map((x) => x.token);
  }

  async setAccessToken(userId: string, access_token: string) {
    await this.db.query({
      text: 'INSERT INTO access_token (user_id, token) VALUES ($1, $2)',
      values: [userId, access_token],
    });
  }
}

import { Client } from 'pg';
import * as dotenv from 'dotenv'
dotenv.config();

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL)

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const connectToDatabase = async () => {
  await client.connect();
};

export const updateUserBalance = async (userId: number, amount: number) => {
  const res = await client.query('SELECT balance FROM users WHERE id = $1', [userId]);
  const balance = res.rows[0].balance;

  if (balance >= amount) {
    await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, userId]);
    return true;
  }
  return false;
};
import { IncomingMessage, ServerResponse } from 'http';
import { updateUserBalance } from '../db';

export const purchaseHandler = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {

    try {
      const { userId, amount } = JSON.parse(body);
      const result = await updateUserBalance(userId, amount);
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success' }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'failure', message: 'Insufficient balance' }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to process purchase' }));
    }
  });
};
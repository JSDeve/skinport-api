import * as http from 'http';
import { getItemsHandler, purchaseHandler } from './routes';
import { connectToDatabase } from './db';
import * as dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/items' && req.method === 'GET') {
    await getItemsHandler(req, res);
  } else if (req.url === '/users/purchase' && req.method === 'POST') {
    await purchaseHandler(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

connectToDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1);
});
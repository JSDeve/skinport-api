import { IncomingMessage, ServerResponse } from 'http';
import { getItemsFromSkinport } from '../utils/api';
import { cacheData, getCachedData } from '../utils/cache';

export const getItemsHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const cachedItems = getCachedData('items');
  if (cachedItems) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cachedItems));
    return;
  }

  try {
    const items = await getItemsFromSkinport();
    cacheData('items', items, 3600); // Кешируем на 1 час
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to fetch items' }));
  }
};
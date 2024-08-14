import axios from 'axios';

export const getItemsFromSkinport = async () => {
  const response = await axios.get('https://api.skinport.com/v1/items?tradable=1');
  const items = response.data.map((item: any) => ({
    name: item.market_hash_name,
    tradablePrice: item.suggested_price,
    nonTradablePrice: item.min_price,
    app_id: item.app_id,
    currency: item.currency,
  }));
  return items;
};
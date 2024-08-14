const cache: { [key: string]: any } = {};

export const cacheData = (key: string, data: any, ttl: number) => {
  cache[key] = {
    data,
    expiry: Date.now() + ttl * 1000,
  };
};

export const getCachedData = (key: string) => {
  const cached = cache[key];
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  return null;
};
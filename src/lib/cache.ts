import { LRUCache } from "lru-cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuCache = new LRUCache<string, any>({
  max: 50,
  ttl: 6 * 60 * 60 * 1000, // 6 hours
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storeCache = new LRUCache<string, any>({
  max: 200,
  ttl: 24 * 60 * 60 * 1000, // 24 hours
});

export function getMenuCache<T>(storeId: string): T | undefined {
  return menuCache.get(storeId) as T | undefined;
}

export function setMenuCache<T>(storeId: string, data: T): void {
  menuCache.set(storeId, data);
}

export function getStoreCache<T>(key: string): T | undefined {
  return storeCache.get(key) as T | undefined;
}

export function setStoreCache<T>(key: string, data: T): void {
  storeCache.set(key, data);
}

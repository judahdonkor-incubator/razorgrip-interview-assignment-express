import redis from 'redis'
import { promisify } from 'util'

export const sub = redis.createClient({ url: 'redis://localhost:7001' })
export const pub = sub.duplicate()
export const cache = sub.duplicate()
export const [getCachedValue, setCachedValue] = [promisify(cache.get).bind(cache), promisify(cache.set).bind(cache)]
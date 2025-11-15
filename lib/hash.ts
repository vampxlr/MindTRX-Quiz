/**
 * Generate unique hash codes for results
 */

import { customAlphabet } from 'nanoid';

// Use alphanumeric characters (uppercase, avoiding confusing chars like O, 0, I, 1)
const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8);

export function generateResultCode(): string {
  return nanoid();
}


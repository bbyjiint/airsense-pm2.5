import crypto from "node:crypto";

let lastTimestamp = -1;
let sequence = 0;

/**
 * Generate standard RFC 9562 UUIDv7
 * - 48-bit timestamp (Unix epoch in ms)
 * - 4-bit version (0b0111 = 7)
 * - 12-bit monotonic counter / random
 * - 2-bit variant (0b10)
 * - 62-bit random
 *
 * Result format: xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx (36 chars)
 */
export function generateUUIDv7() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  const now = Date.now();
  if (now === lastTimestamp) {
    sequence = (sequence + 1) & 0xfff;
  } else {
    lastTimestamp = now;
    sequence = ((bytes[6] & 0x0f) << 8) | bytes[7];
  }

  // 48-bit timestamp (Big-endian)
  const tsBig = BigInt(now);
  bytes[0] = Number((tsBig >> 40n) & 0xffn);
  bytes[1] = Number((tsBig >> 32n) & 0xffn);
  bytes[2] = Number((tsBig >> 24n) & 0xffn);
  bytes[3] = Number((tsBig >> 16n) & 0xffn);
  bytes[4] = Number((tsBig >> 8n) & 0xffn);
  bytes[5] = Number(tsBig & 0xffn);

  // 4-bit version 7 + 12-bit sequence
  bytes[6] = 0x70 | ((sequence >> 8) & 0x0f);
  bytes[7] = sequence & 0xff;

  // 2-bit variant (10xxxxxx)
  bytes[8] = 0x80 | (bytes[8] & 0x3f);

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

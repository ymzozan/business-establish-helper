import { createHmac, timingSafeEqual } from "node:crypto";

export function receiptSecret() {
  return process.env.KUYUMCU_AUTH_SECRET || process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
}

export const receiptLifetime = 60 * 60;

export function receiptName(id: string) {
  return `application-receipt-${id}`;
}

function signature(id: string, expires: string, secret: string) {
  return createHmac("sha256", secret)
    .update(`application-receipt:${id}:${expires}`)
    .digest("hex");
}

export function signReceipt(id: string, secret: string) {
  const expires = String(Math.floor(Date.now() / 1000) + receiptLifetime);
  return `${expires}.${signature(id, expires, secret)}`;
}

export function validReceipt(id: string, value: string | undefined) {
  const secret = receiptSecret();
  const match = value?.match(/^(\d{10})\.([a-f0-9]{64})$/);
  if (!secret || !match || Number(match[1]) <= Date.now() / 1000) return false;
  return timingSafeEqual(
    Buffer.from(signature(id, match[1], secret), "hex"),
    Buffer.from(match[2], "hex"),
  );
}

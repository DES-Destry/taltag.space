/**
 * Parse Solana "insufficient lamports" from SendTransactionError / logs.
 */
export function parseLamportShortfall(err: unknown): { have: bigint; need: bigint } | null {
  const parts: string[] = [];
  if (err instanceof Error) parts.push(err.message);
  const logs = (err as { transactionLogs?: string[] })?.transactionLogs;
  if (Array.isArray(logs)) parts.push(...logs);
  const text = parts.join("\n");
  const m = text.match(/insufficient lamports (\d+), need (\d+)/);
  if (!m) return null;
  return { have: BigInt(m[1]), need: BigInt(m[2]) };
}

export function formatLamports(l: bigint): string {
  const sol = Number(l) / 1e9;
  return `${l.toString()} lamports (~${sol.toFixed(4)} SOL)`;
}

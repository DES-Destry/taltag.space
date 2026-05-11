/**
 * Generates a Solana keypair for minting badges.
 * Run: npx tsx scripts/gen-keypair.ts
 *
 * Outputs MINT_KEYPAIR and BADGE_CREATOR_ADDRESS for .env
 */
import { Keypair } from "@solana/web3.js";
import { writeFileSync } from "fs";
import { join } from "path";

const keypair = Keypair.generate();
const secretKey = keypair.secretKey;
const base64 = Buffer.from(secretKey).toString("base64");
const publicKey = keypair.publicKey.toBase58();

const keypairPath = join(process.cwd(), "creator-keypair.json");
writeFileSync(keypairPath, JSON.stringify(Array.from(secretKey)), "utf-8");

console.log("\n✅ Keypair generated!\n");
console.log("Add these to your .env:\n");
console.log(`MINT_KEYPAIR=${base64}`);
console.log(`BADGE_CREATOR_ADDRESS=${publicKey}`);
console.log(`\nKeypair saved to: ${keypairPath}`);
console.log("\n⚠️  Fund this wallet with SOL before running create-tree.");
console.log("   Devnet: https://faucet.solana.com");
console.log("   Mainnet: Send SOL to", publicKey);

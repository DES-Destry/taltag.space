#!/usr/bin/env npx tsx
/**
 * Full setup: generates keypair, creates tree, updates .env
 * Run: npm run setup
 *
 * Prerequisites: HELIUS_RPC_URL in .env, wallet funded with SOL
 */
import dotenv from "dotenv";
import { resolve } from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { createTree } from "@metaplex-foundation/mpl-bubblegum";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { generateSigner } from "@metaplex-foundation/umi";

const root = resolve(process.cwd());
dotenv.config({ path: resolve(root, ".env.local") });
dotenv.config({ path: resolve(root, ".env") });

async function main() {
  const rpcUrl = process.env.HELIUS_RPC_URL;
  let keypairBase64 = process.env.MINT_KEYPAIR;
  let merkleTreeAddress = process.env.MERKLE_TREE_ADDRESS;

  const envPath = existsSync(resolve(root, ".env.local"))
    ? resolve(root, ".env.local")
    : resolve(root, ".env");

  if (!rpcUrl) {
    console.error("\n❌ HELIUS_RPC_URL is required. Add it to .env:");
    console.error("   HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY\n");
    process.exit(1);
  }

  // Step 1: Generate keypair if missing
  if (!keypairBase64) {
    console.log("\n📦 Generating keypair...");
    const keypair = Keypair.generate();
    keypairBase64 = Buffer.from(keypair.secretKey).toString("base64");
    const publicKey = keypair.publicKey.toBase58();

    const envContent = existsSync(envPath)
      ? readFileSync(envPath, "utf-8")
      : readFileSync(resolve(root, ".env.example"), "utf-8");

    const updates = [
      envContent,
      "",
      "# Added by setup script",
      `MINT_KEYPAIR=${keypairBase64}`,
      `BADGE_CREATOR_ADDRESS=${publicKey}`,
    ].join("\n");

    writeFileSync(envPath, updates);
    console.log(`   MINT_KEYPAIR and BADGE_CREATOR_ADDRESS added to ${envPath}`);
    console.log(`   Creator: ${publicKey}`);
    console.log("\n   ⚠️  Fund this wallet with SOL, then run: npm run setup");
    console.log("   Devnet faucet: https://faucet.solana.com\n");
    process.exit(0);
  }

  // Step 2: Create tree if missing
  if (!merkleTreeAddress) {
    const secretKey = Buffer.from(keypairBase64, "base64");
    if (secretKey.length !== 64) {
      console.error("❌ Invalid MINT_KEYPAIR (must be base64 64 bytes)");
      process.exit(1);
    }

    const isDevnet = rpcUrl.includes("devnet");
    console.log(`\n🌲 Creating Merkle tree (~8 badges, ~0.015 SOL / ~\$2 on ${isDevnet ? "devnet" : "mainnet"})...`);
    const umi = createUmi(rpcUrl).use(mplBubblegum());
    const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
    umi.use(keypairIdentity(keypair));

    const merkleTree = generateSigner(umi);
    const builder = await createTree(umi, {
      merkleTree,
      maxDepth: 3,
      maxBufferSize: 8,
      canopyDepth: 0,
    });

    const { signature } = await builder.sendAndConfirm(umi, {
      confirm: { commitment: "confirmed" },
    });

    merkleTreeAddress = String(merkleTree.publicKey);
    const envContent = readFileSync(envPath, "utf-8");
    const hasKey = /MERKLE_TREE_ADDRESS=/.test(envContent);
    const updated = hasKey
      ? envContent.replace(/MERKLE_TREE_ADDRESS=.*/, `MERKLE_TREE_ADDRESS=${merkleTreeAddress}`)
      : envContent.trimEnd() + `\nMERKLE_TREE_ADDRESS=${merkleTreeAddress}\n`;
    writeFileSync(envPath, updated);

    console.log(`   Tree: ${merkleTreeAddress}`);
    console.log(`   Tx: ${signature}`);
    console.log(`   MERKLE_TREE_ADDRESS added to ${envPath}`);
  }

  console.log("\n✅ Setup complete! Run: npm run dev\n");
}

main().catch((e) => {
  console.error(e);
  if (e?.cause?.transactionLogs?.some((l: string) => l.includes("insufficient lamports"))) {
    console.error("\n💡 Add ~0.015 SOL (~$2) to", process.env.BADGE_CREATOR_ADDRESS);
    console.error("   Or use devnet: HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY");
    console.error("   Then fund from https://faucet.solana.com (select Devnet)\n");
  }
  process.exit(1);
});

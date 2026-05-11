/**
 * One-time script to create a Merkle tree for badge minting.
 * Run: npx tsx scripts/create-tree.ts
 *
 * Requires: HELIUS_RPC_URL, MINT_KEYPAIR in .env or .env.local
 * Output: MERKLE_TREE_ADDRESS to add to .env
 */
import dotenv from "dotenv";
import { resolve } from "path";

const root = resolve(process.cwd());
dotenv.config({ path: resolve(root, ".env.local") });
dotenv.config({ path: resolve(root, ".env") });
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { createTree } from "@metaplex-foundation/mpl-bubblegum";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { generateSigner } from "@metaplex-foundation/umi";

async function main() {
  const rpcUrl = process.env.HELIUS_RPC_URL;
  const keypairBase64 = process.env.MINT_KEYPAIR;

  if (!rpcUrl || !keypairBase64) {
    console.error("Set HELIUS_RPC_URL and MINT_KEYPAIR in .env");
    process.exit(1);
  }

  const secretKey = Buffer.from(keypairBase64, "base64");
  if (secretKey.length !== 64) {
    console.error("MINT_KEYPAIR must be base64-encoded 64-byte secret key");
    process.exit(1);
  }

  const umi = createUmi(rpcUrl).use(mplBubblegum());
  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
  umi.use(keypairIdentity(keypair));

  const merkleTree = generateSigner(umi);

  console.log("Creating Merkle tree (~8 badges, ~0.015 SOL / ~$2)...");
  const builder = await createTree(umi, {
    merkleTree,
    maxDepth: 3,
    maxBufferSize: 8,
    canopyDepth: 0,
  });

  const { signature } = await builder.sendAndConfirm(umi, {
    confirm: { commitment: "confirmed" },
  });

  console.log("\n✅ Merkle tree created!");
  console.log("MERKLE_TREE_ADDRESS=" + merkleTree.publicKey);
  console.log("Tx:", signature);
  console.log("\nAdd MERKLE_TREE_ADDRESS to your .env");
}

main().catch(console.error);

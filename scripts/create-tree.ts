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
import { BUBBLEGUM_TREE_CONFIG } from "../src/lib/bubblegum-tree-config";
import { formatLamports, parseLamportShortfall } from "./tree-errors";

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

  const cap = 2 ** BUBBLEGUM_TREE_CONFIG.maxDepth;
  console.log(
    `Creating Merkle tree (up to ${cap.toLocaleString()} cNFTs; higher rent than the old 8-slot demo tree)...`
  );
  const builder = await createTree(umi, {
    merkleTree,
    ...BUBBLEGUM_TREE_CONFIG,
  });

  let signature: string | Uint8Array;
  try {
    const result = await builder.sendAndConfirm(umi, {
      confirm: { commitment: "confirmed" },
    });
    signature = result.signature;
  } catch (e) {
    const short = parseLamportShortfall(e);
    if (short) {
      const payer = umi.identity.publicKey;
      const delta = short.need - short.have;
      console.error("\n❌ Payer wallet is under-funded for this tree size.");
      console.error(`   Payer: ${payer}`);
      console.error(`   Have:  ${formatLamports(short.have)}`);
      console.error(`   Need:  ${formatLamports(short.need)} (this instruction)`);
      console.error(`   Send at least ${formatLamports(delta)} more SOL to the payer, then retry.\n`);
    }
    throw e;
  }

  console.log("\n✅ Merkle tree created!");
  console.log("MERKLE_TREE_ADDRESS=" + merkleTree.publicKey);
  console.log("Tx:", signature);
  console.log("\nAdd MERKLE_TREE_ADDRESS to your .env");
}

main().catch((e) => {
  if (!parseLamportShortfall(e)) console.error(e);
  process.exit(1);
});

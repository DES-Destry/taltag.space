import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { publicKey } from "@metaplex-foundation/umi-public-keys";
import { none } from "@metaplex-foundation/umi";
import { TokenStandard } from "@metaplex-foundation/mpl-bubblegum";
import bs58 from "bs58";

/** Bubblegum / Token Metadata on-chain `name` limit (bytes, UTF-8). */
const MAX_METADATA_NAME_BYTES = 32;

function truncateUtf8(input: string, maxBytes: number): string {
  const utf8 = new TextEncoder().encode(input);
  if (utf8.length <= maxBytes) return input;
  let cut = maxBytes;
  while (cut > 0 && (utf8[cut - 1] & 0xc0) === 0x80) cut -= 1;
  return new TextDecoder("utf-8", { fatal: false }).decode(utf8.slice(0, cut));
}

export interface MintBadgeParams {
  recipientWallet: string;
  metadataUri: string;
  skillName: string;
  recipientName: string;
}

export async function mintBadge(params: MintBadgeParams): Promise<{ signature: string }> {
  const rpcUrl = process.env.HELIUS_RPC_URL;
  const merkleTreeAddress = process.env.MERKLE_TREE_ADDRESS;
  const keypairBase64 = process.env.MINT_KEYPAIR;

  if (!rpcUrl || !merkleTreeAddress || !keypairBase64) {
    throw new Error(
      "Missing config: mint credentials are not set on the server"
    );
  }

  const secretKey = Buffer.from(keypairBase64, "base64");
  if (secretKey.length !== 64) {
    throw new Error("MINT_KEYPAIR must be base64-encoded 64-byte secret key");
  }

  const umi = createUmi(rpcUrl).use(mplBubblegum());

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
  umi.use(keypairIdentity(keypair));

  const rawName = `${params.skillName} — ${params.recipientName}`;
  const name = truncateUtf8(rawName, MAX_METADATA_NAME_BYTES);

  const tx = await mintV1(umi, {
    leafOwner: publicKey(params.recipientWallet),
    merkleTree: publicKey(merkleTreeAddress),
    metadata: {
      name,
      symbol: "TAG",
      uri: params.metadataUri,
      sellerFeeBasisPoints: 0,
      collection: none(),
      creators: [
        {
          address: umi.identity.publicKey,
          verified: true,
          share: 100,
        },
      ],
      tokenStandard: TokenStandard.NonFungible,
    },
  });

  let sendResult: { signature: string | Uint8Array };
  try {
    sendResult = await tx.sendAndConfirm(umi, {
      confirm: { commitment: "confirmed" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (
      msg.includes("InsufficientMintCapacity") ||
      msg.includes("6017") ||
      msg.includes("0x1781") ||
      msg.includes("Not enough unapproved mints left")
    ) {
      throw new Error(
        "Merkle tree is full (mint capacity exhausted). Create a new tree: `npx tsx scripts/create-tree.ts`, set MERKLE_TREE_ADDRESS in env, fund the creator wallet for rent, then retry."
      );
    }
    if (
      msg.includes("MetadataNameTooLong") ||
      msg.includes("6012") ||
      msg.includes("0x177c") ||
      msg.includes("Name in metadata is too long")
    ) {
      throw new Error(
        "On-chain metadata name exceeds the program limit (this should not happen after truncation). Report this error."
      );
    }
    throw e;
  }

  const { signature } = sendResult;
  const sigBase58 =
    typeof signature === "string"
      ? signature
      : bs58.encode(signature instanceof Uint8Array ? signature : new Uint8Array(signature));
  return { signature: sigBase58 };
}

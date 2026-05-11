import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { publicKey } from "@metaplex-foundation/umi-public-keys";
import { none } from "@metaplex-foundation/umi";
import { TokenStandard } from "@metaplex-foundation/mpl-bubblegum";
import bs58 from "bs58";

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
      "Missing config: HELIUS_RPC_URL, MERKLE_TREE_ADDRESS, MINT_KEYPAIR"
    );
  }

  const secretKey = Buffer.from(keypairBase64, "base64");
  if (secretKey.length !== 64) {
    throw new Error("MINT_KEYPAIR must be base64-encoded 64-byte secret key");
  }

  const umi = createUmi(rpcUrl).use(mplBubblegum());

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
  umi.use(keypairIdentity(keypair));

  const tx = await mintV1(umi, {
    leafOwner: publicKey(params.recipientWallet),
    merkleTree: publicKey(merkleTreeAddress),
    metadata: {
      name: `${params.skillName} Badge — ${params.recipientName}`,
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

  const { signature } = await tx.sendAndConfirm(umi, {
    confirm: { commitment: "confirmed" },
  });

  const sigBase58 =
    typeof signature === "string"
      ? signature
      : bs58.encode(signature instanceof Uint8Array ? signature : new Uint8Array(signature));
  return { signature: sigBase58 };
}

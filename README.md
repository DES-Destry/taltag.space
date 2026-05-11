# TalentTag — Skill Badges on Solana

A lightweight web platform where users can claim "Skill Badges" as Compressed NFTs (cNFTs) on Solana. Permanent, on-chain records of verified skills.

## Features

- **Claim Interface** — Select a skill, enter details, and mint a badge
- **cNFT Minting** — Automated minting via Metaplex Bubblegum
- **Badge Gallery** — Public dashboard to browse and verify issued badges

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup for On-Chain Minting

1. **Copy env** — `cp .env.example .env`

2. **Add Helius RPC** — Get a free key at [helius.dev](https://helius.dev) and set in `.env`:
   ```
   HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
   SOLANA_NETWORK=devnet
   ```
   (Use devnet for testing with free SOL from [faucet.solana.com](https://faucet.solana.com))

3. **Run setup** — Generates keypair and creates Merkle tree:
   ```bash
   npm run setup
   ```
   First run adds `MINT_KEYPAIR` and `BADGE_CREATOR_ADDRESS`. Fund the wallet with SOL, then run `npm run setup` again to create the tree.

   Or manually: `npm run gen-keypair` → `npm run create-tree`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `HELIUS_RPC_URL` | Helius RPC URL (required for minting) |
| `MERKLE_TREE_ADDRESS` | Merkle tree address (from create-tree script) |
| `MINT_KEYPAIR` | Base64-encoded 64-byte secret key |
| `BADGE_CREATOR_ADDRESS` | Creator wallet — badges appear in gallery |
| `NEXT_PUBLIC_APP_URL` | App URL for metadata (auto on Vercel) |
| `SOLANA_NETWORK` | Set to `devnet` for devnet explorer links |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Solana web3.js
- Metaplex Bubblegum (cNFTs)

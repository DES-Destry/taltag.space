/**
 * Shared Bubblegum Merkle tree args for `createTree` (scripts) and operator docs.
 * Capacity is 2^maxDepth leaves (here: 2^9 = 512 cNFTs per tree).
 *
 * `(maxDepth, maxBufferSize)` must be a pair allowed by SPL concurrent Merkle trees
 * (same table as `ALL_DEPTH_SIZE_PAIRS` in `@solana/spl-account-compression`); arbitrary
 * combinations fail on-chain with ConcurrentMerkleTreeConstantsError (e.g. depth 10
 * requires buffer 32, not 16).
 *
 * This tier keeps Merkle-account rent around ~0.04 SOL so a ~0.06 SOL payer can still
 * afford `createTree` plus the tree-config account and fees. For 1024+ leaves, use
 * depth 10 / buffer 32 and fund the payer with ~0.09+ SOL.
 *
 * `canopyDepth: 0` keeps rent lower than a deep canopy.
 *
 * @see https://developers.metaplex.com/bubblegum/create-trees
 */
export const BUBBLEGUM_TREE_CONFIG = {
  maxDepth: 9,
  maxBufferSize: 16,
  canopyDepth: 0,
} as const;

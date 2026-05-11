export interface BadgeClaimRequest {
  skillId: string;
  name: string;
  email: string;
  walletAddress: string;
}

export interface Badge {
  id: string;
  assetId?: string;
  skillId: string;
  skillName: string;
  recipientName: string;
  walletAddress: string;
  mintedAt?: string;
  imageUri?: string;
  verified?: boolean;
}

import type { Metadata } from "next";
import { MainContainer } from "@/components/MainContainer";
import { PageHeader, pagePadding } from "@/components/PageHeader";
import { SkillsCatalog } from "@/components/SkillsCatalog";

export const metadata: Metadata = {
  title: "Skills catalog — TalentTag",
  description: "Browse every skill badge available on TalentTag. Pick one and mint your cNFT on Solana.",
};

export default function SkillsPage() {
  return (
    <MainContainer className={pagePadding}>
      <PageHeader
        eyebrow="Catalog"
        title="Skills catalog"
        description="Every domain uses the same verifiable minting flow. Browse the full list, pick your skill, then claim your badge."
      />
      <SkillsCatalog mode="browse" />
    </MainContainer>
  );
}

"use client";

import { Suspense } from "react";
import { ClaimForm } from "@/components/ClaimForm";
import { SolanaWalletProvider } from "@/components/SolanaWalletProvider";

export function ClaimFormShell() {
  return (
    <SolanaWalletProvider>
      <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
        <ClaimForm />
      </Suspense>
    </SolanaWalletProvider>
  );
}

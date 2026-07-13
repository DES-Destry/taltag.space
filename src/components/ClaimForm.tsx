"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { BadgePreview } from "@/components/BadgePreview";
import { useSkillCatalogSearch } from "@/hooks/useSkillCatalogSearch";

type FieldKey = "skillId" | "name" | "wallet";

export function ClaimForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { publicKey } = useWallet();
  const { query, setQuery, sections, trimmedQuery } = useSkillCatalogSearch();
  const [skillId, setSkillId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, boolean>>>({});

  useEffect(() => {
    const fromUrl = searchParams.get("skill");
    if (fromUrl) setSkillId(fromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (publicKey) setWallet(publicKey.toBase58());
  }, [publicKey]);

  const nameTrimmed = name.trim();
  const emailTrimmed = email.trim();
  const walletTrimmed = wallet.trim();

  function inputClass(hasError?: boolean) {
    return ["tt-input", hasError ? "tt-input-error" : ""].filter(Boolean).join(" ");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextFieldErrors: Partial<Record<FieldKey, boolean>> = {
      skillId: !skillId.trim(),
      name: !nameTrimmed,
      wallet: !walletTrimmed,
    };
    setFieldErrors(nextFieldErrors);
    if (Object.values(nextFieldErrors).some(Boolean)) {
      setStatus("error");
      setMessage("Please fill in the highlighted fields.");
      setExplorerUrl(null);
      return;
    }

    setStatus("loading");
    setMessage("");
    setExplorerUrl(null);

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillId: skillId.trim(),
          name: nameTrimmed,
          email: emailTrimmed || undefined,
          walletAddress: walletTrimmed,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && Array.isArray(data?.missingFields)) {
          setFieldErrors({
            skillId: data.missingFields.includes("skillId"),
            name: data.missingFields.includes("name"),
            wallet: data.missingFields.includes("walletAddress"),
          });
        }
        throw new Error(data.error || "Claim failed");
      }

      if (data.proofUrl) {
        router.push(data.proofUrl);
        return;
      }

      setStatus("success");
      setMessage("Badge minted! Check your wallet.");
      if (data.explorerUrl) setExplorerUrl(data.explorerUrl);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="claim-skill-search"
          className={`mb-2 block text-sm font-medium ${fieldErrors.skillId ? "text-stamp" : "text-ink-soft"}`}
        >
          Select your skill
        </label>
        <div className="mb-4">
          <input
            id="claim-skill-search"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search by name, category, or slug…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={inputClass(fieldErrors.skillId)}
          />
        </div>
        <div
          className={`-mr-1 max-h-[min(70vh,28rem)] space-y-8 overflow-y-auto pr-1 ${
            fieldErrors.skillId ? "rounded-sm ring-1 ring-stamp" : ""
          }`}
        >
          {sections.length === 0 ? (
            <p className="border border-dashed border-line py-8 text-center text-sm text-muted">
              No skills match &ldquo;{trimmedQuery}&rdquo;.{" "}
              <a href="/skills" className="tt-link">
                Browse full catalog
              </a>
            </p>
          ) : (
            sections.map(({ category, skills }) => (
              <div key={category.id}>
                <p className="tt-label mb-1">{category.title}</p>
                <p className="mb-3 text-xs text-muted">{category.blurb}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSkillId(skill.id)}
                      className={`flex flex-col items-center gap-1 border p-3 transition-all ${
                        skillId === skill.id
                          ? "border-stamp bg-[color-mix(in_srgb,var(--stamp)_8%,transparent)] ring-1 ring-stamp"
                          : "border-line bg-paper-raised hover:border-ink/30"
                      }`}
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <span className="text-center text-xs font-medium leading-tight text-ink-soft">
                        {skill.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BadgePreview skillId={skillId} recipientName={nameTrimmed || undefined} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass(fieldErrors.name)}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass()}
            placeholder="jane@example.com"
          />
          <p className="mt-1 text-xs text-muted">For operational notices about your mint only.</p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="wallet" className="block text-sm font-medium text-ink-soft">
            Solana wallet address
          </label>
          <WalletMultiButton />
        </div>
        <input
          id="wallet"
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
          className={`${inputClass(fieldErrors.wallet)} font-mono text-sm`}
          placeholder="Your wallet address (e.g. 7xKX...)"
        />
      </div>

      {message && (
        <div className="space-y-1">
          <p className={`text-sm ${status === "success" ? "text-[var(--ok)]" : "text-stamp"}`}>
            {message}
          </p>
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tt-link text-sm underline"
            >
              View transaction on Solscan →
            </a>
          )}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className="tt-btn w-full">
        {status === "loading" ? "Claiming..." : "Claim Skill Badge"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useSkillCatalogSearch } from "@/hooks/useSkillCatalogSearch";

type FieldKey = "skillId" | "name" | "email" | "wallet";

export function ClaimForm() {
  const { query, setQuery, sections, trimmedQuery } = useSkillCatalogSearch();
  const [skillId, setSkillId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, boolean>>>({});

  const nameTrimmed = name.trim();
  const emailTrimmed = email.trim();
  const walletTrimmed = wallet.trim();

  function inputClass(hasError?: boolean) {
    return [
      "w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2",
      hasError
        ? "border-rose-500/60 focus:ring-rose-500/35 focus:border-rose-500/60"
        : "border-white/10 focus:ring-cyan-500/50 focus:border-cyan-500/50",
    ].join(" ");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextFieldErrors: Partial<Record<FieldKey, boolean>> = {
      skillId: !skillId.trim(),
      name: !nameTrimmed,
      email: !emailTrimmed,
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
          email: emailTrimmed,
          walletAddress: walletTrimmed,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && Array.isArray(data?.missingFields)) {
          setFieldErrors({
            skillId: data.missingFields.includes("skillId"),
            name: data.missingFields.includes("name"),
            email: data.missingFields.includes("email"),
            wallet: data.missingFields.includes("walletAddress"),
          });
        }
        throw new Error(data.error || "Claim failed");
      }

      setStatus("success");
      setMessage("Badge minted! Check your wallet.");
      if (data.explorerUrl) setExplorerUrl(data.explorerUrl);
      setName("");
      setEmail("");
      setWallet("");
      setSkillId("");
      setFieldErrors({});
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
          className={`block text-sm font-medium mb-2 ${fieldErrors.skillId ? "text-rose-300" : "text-zinc-400"}`}
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
          className={`max-h-[min(70vh,28rem)] space-y-8 overflow-y-auto pr-1 -mr-1 ${
            fieldErrors.skillId ? "ring-1 ring-rose-500/25 rounded-xl" : ""
          }`}
        >
          {sections.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/10 py-8 text-center text-sm text-zinc-500">
              No skills match &ldquo;{trimmedQuery}&rdquo;.
            </p>
          ) : (
            sections.map(({ category, skills }) => (
              <div key={category.id}>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {category.title}
                </p>
                <p className="mb-3 text-xs text-zinc-600">{category.blurb}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSkillId(skill.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                        skillId === skill.id
                          ? "border-cyan-500/50 bg-cyan-500/10 ring-1 ring-cyan-500/30"
                          : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <span className="text-xs font-medium text-center leading-tight">{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1.5">
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
          <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass(fieldErrors.email)}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="wallet" className="block text-sm font-medium text-zinc-400 mb-1.5">
          Solana wallet address
        </label>
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
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {message}
          </p>
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-400 hover:text-cyan-300 underline"
            >
              View transaction on Solscan →
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {status === "loading" ? "Claiming..." : "Claim Skill Badge"}
      </button>
    </form>
  );
}

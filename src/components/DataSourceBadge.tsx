type Props = {
  source: "demo" | "chain";
};

export function DataSourceBadge({ source }: Props) {
  if (source === "chain") {
    return (
      <span className="inline-flex items-center gap-1.5 border border-[color-mix(in_srgb,var(--ok)_35%,transparent)] bg-[color-mix(in_srgb,var(--ok)_10%,transparent)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--ok)]">
        <span className="h-1.5 w-1.5 bg-[var(--ok)]" />
        Live on Solana
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 border border-[color-mix(in_srgb,var(--warn)_40%,transparent)] bg-[color-mix(in_srgb,var(--warn)_10%,transparent)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--warn)]">
      Demo data
    </span>
  );
}

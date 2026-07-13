import type { ReactNode } from "react";

export const pagePadding = "py-10 sm:py-14 lg:py-16";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, children, className = "" }: Props) {
  return (
    <header className={`mb-12 sm:mb-16 ${className}`.trim()}>
      <p className="tt-label mb-3 text-stamp">{eyebrow}</p>
      <h1 className="tt-display mb-4 text-4xl text-ink sm:text-5xl md:text-[3.25rem]">{title}</h1>
      <div className="tt-rule mb-5 h-0.5 w-14 bg-stamp" />
      {description ? (
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>
      ) : null}
      {children}
    </header>
  );
}

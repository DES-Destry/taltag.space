import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Shared max width for all primary pages (aligns with gallery grid). */
export function MainContainer({ children, className = "" }: Props) {
  return (
    <main className={`relative w-full max-w-6xl flex-1 mx-auto px-4 sm:px-6 ${className}`.trim()}>
      {children}
    </main>
  );
}

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Shared max width for all primary pages (aligns with gallery grid). */
export function MainContainer({ children, className = "" }: Props) {
  return (
    <main className={`relative mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8 ${className}`.trim()}>
      {children}
    </main>
  );
}

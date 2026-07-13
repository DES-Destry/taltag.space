import { Suspense } from "react";
import GalleryPage from "./GalleryClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted">Loading gallery…</div>}>
      <GalleryPage />
    </Suspense>
  );
}

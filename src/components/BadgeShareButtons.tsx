"use client";

type Props = {
  url: string;
  title: string;
};

export function BadgeShareButtons({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="tt-btn-ghost !px-4 !py-2.5 text-sm"
      >
        Share on LinkedIn
      </a>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="tt-btn-ghost !px-4 !py-2.5 text-sm"
      >
        Share on X
      </a>
    </div>
  );
}

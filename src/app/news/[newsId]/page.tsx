import { Suspense } from 'react';

/* ---------- helpers ---------- */

// Je kono value (string / array / {blocks} / {text}) ke safe string banay
function toText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(toText).filter(Boolean).join(' ');
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;
    for (const key of ['blocks', 'text', 'content', 'children', 'value', 'caption', 'title']) {
      if (key in v) return toText(v[key]);
    }
  }
  return '';
}

function toBlocks(value: unknown): { type: string; text: string }[] {
  if (value == null) return [];
  if (typeof value === 'string') return [{ type: 'paragraph', text: value }];
  if (Array.isArray(value)) {
    return value
      .map((b) => {
        const type =
          b && typeof b === 'object' ? String((b as any).type ?? 'paragraph') : 'paragraph';
        return { type, text: toText(b) };
      })
      .filter((b) => b.text);
  }
  if (typeof value === 'object' && 'blocks' in (value as object)) {
    return toBlocks((value as any).blocks);
  }
  return [{ type: 'paragraph', text: toText(value) }];
}

function toImage(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    return toText(v.url ?? v.src ?? '');
  }
  return '';
}

const HEADING_TYPES = ['heading', 'h1', 'h2', 'h3', 'subheading', 'subtitle'];

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/* ---------- content ---------- */

async function NewsDetailContent({ newsId }: { newsId: string }) {
  const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`);
  const data = await res.json();
  const news: any = data.data ?? data;

  const title = toText(news.title);
  const description = toText(news.description);
  const imageUrl = toImage(news.imageUrl ?? news.image);
  const imageAlt = toText(news.imageAlt) || title;
  const imageCaption = toText(news.imageCaption ?? news.caption);
  const publishedAt = toText(news.publishedAt);
  const blocks = toBlocks(news.content ?? news.body ?? news.text);
  const tags: string[] = Array.isArray(news.tags)
    ? news.tags.map(toText).filter(Boolean)
    : [];

  const plain = blocks.map((b) => b.text).join(' ');
  const wordCount =
    typeof news.wordCount === 'number'
      ? news.wordCount
      : plain
      ? plain.trim().split(/\s+/).length
      : 0;

  return (
    <article className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-bold leading-snug">{title}</h1>

      {description && (
        <p className="mb-6 text-base leading-8 text-gray-600">{description}</p>
      )}

      <div className="mb-6 flex items-center gap-3 border-y border-gray-200 py-3 text-sm text-gray-500">
        {publishedAt && <span>{formatDate(publishedAt)}</span>}
        {wordCount > 0 && <span>{wordCount} শব্দ</span>}
      </div>

      {imageUrl && (
        <figure className="mb-8">
          <img src={imageUrl} alt={imageAlt} className="w-full rounded-lg object-cover" />
          {imageCaption && (
            <figcaption className="mt-2 text-sm text-gray-500">{imageCaption}</figcaption>
          )}
        </figure>
      )}

      <div className="space-y-4">
        {blocks.map((block, i) =>
          HEADING_TYPES.includes(block.type) ? (
            <h2 key={i} className="pt-4 text-xl font-bold">
              {block.text}
            </h2>
          ) : (
            <p key={i} className="text-sm leading-7 text-gray-800">
              {block.text}
            </p>
          )
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/* ---------- page ---------- */

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;

  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <NewsDetailContent newsId={newsId} />
    </Suspense>
  );
}
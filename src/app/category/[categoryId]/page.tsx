import NewsCard from '@/components/NewsCard';
import Loading from '@/app/loading';
import { Suspense } from 'react';

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

async function CategoryNewsContent({ categoryId }: { categoryId: string }) {
  "use cache";

  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
  const data = await res.json();
  const categoryNews: News[] = data.data;

  return (
    <div>
      <h1 className='text-2xl font-bold border-b-2 border-red-700 mb-5 container mx-auto'>
        {data.title}
      </h1>

      <div className='grid grid-cols-3 gap-10 container mx-auto'>
        {categoryNews.map(news => <NewsCard key={news.id} article={news} />)}
      </div>
    </div>
  );
}

// Not cached, so the delay runs on every visit
async function CategoryData({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2000 = 2 seconds

  return <CategoryNewsContent categoryId={categoryId} />;
}

export default function CategoryNews({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryData params={params} />
    </Suspense>
  );
}
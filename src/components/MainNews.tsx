import Link from "next/link";
import React from "react";

type News = {
  id?: string | number;
  title?: string;
  description?: string;
  imageURL?: string;
  image?: string;
  imageUrl?: string;
  urlToImage?: string;
  thumbnail?: string;
  category?: string;
};

const getImage = (n: News) =>
  n.imageURL || n.imageUrl || n.image || n.urlToImage || n.thumbnail;

const MainNews = ({ news }: { news: News[] }) => {
  const firstNews = news?.[0];
  const otherNews = news?.slice(1, 5) ?? [];

  if (!firstNews) {
    return <p>কোনো সংবাদ পাওয়া যায়নি।</p>;
  }

  const imageSrc = getImage(firstNews);

  return (
    <div className="flex items-stretch gap-6">
      {/* Main news card */}
<Link href={`/news/${firstNews.id}`}>
        <div className="card bg-base-100 w-96 shrink-0 shadow-sm">
          {firstNews.category && (
            <p className="px-4 pt-3 text-red-600 font-semibold">
              {firstNews.category}
            </p>
          )}

          {imageSrc && (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={firstNews.title ?? "news"}
                className="w-full h-auto"
              />
            </figure>
          )}

          <div className="card-body">
            <h2 className="card-title">{firstNews.title}</h2>
            <p>{firstNews.description}</p>
          </div>
        </div>
      </Link>

      {/* Other news list: main card er shoman height */}
      <div className="flex flex-1 flex-col bg-base-100">
        {otherNews.map((on, i) => (
          <Link key={on.id ?? i} href={`/news/${on.id}`}>
            <div
              className="flex flex-1 flex-col justify-center border-b border-gray-300 py-3 last:border-b-0"
            >
              {on.category && (
                <p className="text-red-500 text-sm font-semibold">
                  {on.category}
                </p>
              )}

              <h3>{on.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
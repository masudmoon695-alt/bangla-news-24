"use cache";
import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IArticle {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
}

interface IOtherSections {
  curationID?: string;
  title?: string;
  articles?: IArticle[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  const otherSections: IOtherSections[] = sections.slice(1);

  return (
    <div>
      <div className="grid gap-5 grid-cols-3 container mx-auto">
        {/* News section */}
        <div className="col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            {otherSections.map((section, index) => (
              <div
                className="border-b-2 border-red-700 pb-1"
                key={section.curationID ?? section.title ?? index}
              >
                <h1 className="font-bold">{section.title}</h1>

                <div className="grid grid-cols-3 gap-5 mt-2">
                  {(section.articles ?? []).map((article, i) => (
                    <NewsCard
                      key={article.id ?? `${section.title}-${i}`}
                      article={article}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Read Section */}
        <div className="col-span-1">
          <MostRead />
        </div>
      </div>
    </div>
  );
}
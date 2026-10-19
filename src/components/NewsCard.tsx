import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News{
  id:string;
  title:string;
  description:string;
  category:string;
  imageUrl:string;
  imageAlt:string;
}

const NewsCard = ({ article}:{article:News}) => {
  return (
  <Link href={`/news/${article.id}`}>
    <div className="card bg-base-100  shadow-sm">
      {article.imageUrl && (
        <figure>
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            width={500}
            height={300}
            className="w-full h-auto"
          />
        </figure>
      )}

      <div className="card-body grid-cols-3">
        <h2 className="text-red-600 font-bold">{article.category}</h2>
        <h2 className="card-title">{article.title}</h2>
        <p>{article.description}</p>
      </div>
    </div>
  </Link>
  );
};

export default NewsCard;
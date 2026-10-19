import React from "react";
import Link from "next/link";

interface INavs {
  title: string;
  slug: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  const navs: INavs[] = data?.data ?? [];
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="flex justify-center gap-4 py-2 border-t">
      <Link href="/">হোম</Link>

      {filteredNavs.map((n) => (
        <Link key={n.slug} href={`/category/${n.slug}`}>
          {n.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
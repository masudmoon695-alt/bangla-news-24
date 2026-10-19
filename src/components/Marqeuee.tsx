"use cache";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import React from 'react';
interface IHeadlines{
  id: string;
  title: string;
}

const Marqeuee = async() => {

  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10"); 
  const data = await res.json();
  const headlines:IHeadlines[]= data.data;
  console.log(headlines);



  return (
    <div className="bg-red-700 text-white">

     <div className="flex items-center container mx-auto">
       <div className="bg-red-800 py-1 px-5">সর্বশেষ</div>

      <MarqueeText className="py-1" direction="right" duration={10}>
{headlines.map(h=><span>
        <span key={h.id}>
          {h.title}
        </span>
        <span className='mx-5'>•</span>
      </span>)}
      </MarqueeText>
     </div>
      
    </div>
  );
};

export default Marqeuee;
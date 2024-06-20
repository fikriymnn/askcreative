import React from "react";
import Image from "next/image";

function ArticleCard({ img, title, date, id }) {
  return (
    <>
      <a href={`/articles/article?id=${id}`}>
        <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out grid grid-cols-2 md:flex md:flex-col h-full">
          <div
            className="bg-blue-700 rounded-3xl md:grid grid-cols-1 h-28 md:h-36 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
          <div className="p-3  h-24 flex flex-col justify-between">
            <h1 className="font-semibold text-gray-900 line-clamp-2 ">
              {title}
            </h1>
            <h2 className="mt-auto">{date}</h2>
          </div>
        </div>
      </a>
    </>
  );
}

export default ArticleCard;

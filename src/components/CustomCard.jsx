"use client";
import React from "react";
import Image from "next/image";
import { Card } from "flowbite-react";
import Link from "next/link";
//import { parse } from "path";
import parse from "html-react-parser";
function CustomCard({ text, isi, isi2, img, id }) {
  return (
    <Link href={`/articles/article?id=${id}`}>
      <div
        className=" transform md:hover:-translate-y-4 duration-100 ease-in-out my-0  border-gray-50 border-2 shadow-lg rounded-2xl flex flex-col"
        imgalt="Meaningful alt text for an image that is not purely decorative"
      >
        <div
          className=" h-[200px] rounded-t-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          {/* <Image src={img} alt="" height={0} width={520} /> */}
        </div>
        <div className="m-2  flex flex-col h-[60%] ">
          <div>
            <h5 className="text-xl font-semibold  text-gray-900 dark:text-white my-1 line-clamp-3">
              {text}
            </h5>
            <div className="font-normal text-[#6b7280] line-clamp-2 mb-5">
              {isi}
            </div>
          </div>
          <div className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 ">
            <div>{parse(isi2)}</div>
           
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CustomCard;

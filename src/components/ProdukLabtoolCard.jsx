"use client";
import React from "react";
import Image from "next/image";
import { PinContainer } from "@/components/produk/CardUi";
 
function ProdukLabtoolCard({ img, title, price,kategori, id }) {
  return (
    <>
      <a href={`/produk_labtool/product?id=${id}`}>
        <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out  flex flex-col h-full">
          <div
            className="bg-blue-700 overflow-hidden rounded-3xl md:grid grid-cols-1 h-36 md:h-36 bg-cover bg-no-repeat bg-center"
            
          >
            <img src={img} alt="" />
          </div>
          <div className="p-3  h-24 flex flex-col justify-between">
            <h1 className="font-semibold text-gray-900 line-clamp-2 ">
              {title}
            </h1>
            <h1 className="font-normal text-sm text-green-900 line-clamp-2 ">
              {kategori}
            </h1>
            <h2 className="mt-auto">{price}</h2>
          </div>
        </div>
      </a>
    
    </>
  );
}

export default ProdukLabtoolCard;

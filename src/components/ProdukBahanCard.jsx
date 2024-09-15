"use client";
import React from "react";
import Image from "next/image";
import { PinContainer } from "@/components/produk/CardUi";
 
function ProdukBahanCard({ img, title, price,kategori, id }) {
  return (
    <>
      <a href={`/produk_bahan/product?id=${id}`}>
        <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out flex flex-col h-full">
          <div
            className="bg-blue-700 rounded-3xl md:grid grid-cols-1 overflow-hidden h-36 md:h-36 bg-cover bg-no-repeat bg-center"
            
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
            <h2 className="mt-auto">Rp {price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
          </div>
        </div>
      </a>
      {/* <div className="  ">
      <PinContainer
        title={title}
        href="https://twitter.com/mannupaaji"
      >
        <div className="flex  flex-col p-4 tracking-tight text-slate-100/50 w-96">
          <h3 className="!pb-2 !m-0 font-bold  text-base text-slate-100">
           {title}
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Customizable Tailwind CSS and Framer Motion Components.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div> */}
    </>
  );
}

export default ProdukBahanCard;

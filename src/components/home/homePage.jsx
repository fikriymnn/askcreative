"use client";
import React from "react";
import Image from "next/image";
import MainCard from "@/components/MainCard";
import CustomCard from "@/components/CustomCard";
import Landing from '@/components/home/landing'
import Services from '@/components/home/services'
import MultipleCarousel from "@/components/MultipleCarousel";
import Link from "next/link";
import Navbar from '@/components/newcomps/navbar'
import HomeNavbarWithCTAButton from "@/components/HomeNavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import { Carousel } from "flowbite-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function HomePage({
  dataHeading,
  dataParagraph,
  dataArticle,
  dataArticle4,
  dataPackage,
}) {
  const { language, changeLanguage } = useLanguage();
  const [Index, setIndex] = useState();
  return (
    <>
      <div className="z-40">
       <Navbar/>
      </div>
      <Landing dataHeading={dataHeading} dataParagraph={dataParagraph}/>

      {/* ==== SERVICES ==== */}
      <Services/>
      <p className="font-semibold text-3xl text-center pt-3 pb-6 ">
        {language == "en" ? "Latest Articles" : "最新文章"}
      </p>

      <div className="md:grid md:grid-cols-3 gap-4 px-10 ">
        {dataArticle.map((data, i) => {
          const secon = data.createdAt.seconds;
          const date = new Date(secon * 1000);
          // Format tanggal
          const formattedDate = format(date, "yyyy-MM-dd");

          return (
            <div key={i}>
              <CustomCard
                text={language == "en" ? data.titleEnglish : data.titleChinese}
                isi={language == "en" ? data.date : formattedDate}
                isi2={
                  language == "en"
                    ? data.content[0].contentIng
                    : data.content[0].contentChi
                }
                id={data.id}
                img={data.img}
              />
            </div>
          );
        })}
        <div className=" flex flex-col">
          {dataArticle4.map((data, i) => {
            const secon = data.createdAt.seconds;
            const date = new Date(secon * 1000);
            // Format tanggal
            const formattedDate = format(date, "yyyy-MM-dd");
            return (
              <a key={i} href={`/articles/article?id=${data.id}`}>
                <div className="cursor-pointer border-b-[2px] border-[#031530]  my-4 md:mb-3 md:mt-0">
                  <div className="font-semibold text-xl leading-[30px] hover:underline line-clamp-2">
                    {language == "en" ? data.titleEnglish : data.titleChinese}
                  </div>
                  <h1 className="text-[#6b7280]">
                    {language == "en" ? data.date : formattedDate}
                  </h1>
                </div>
              </a>
            );
          })}
          <div className="mt-auto pb-3">
            <a href="/articles">
              <div className=" md:hover:translate-x-4 duration-100 ease-in-out lg:mt-auto text-primary font-medium cursor-pointer flex items-center lg:justify-center bottom-0 space-x-1 text-blue-600  ">
                <p>{language == "en" ? "View More Articles" : "查看更多"}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-[1rem] w-auto mt-1 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  ></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 w-full py-4 mt-6">
        <div className="font-semibold text-3xl text-center pt-9 pb-4 ">
          <p>
            Newest Eventsnew text
          </p>
        </div>
        <div className="md:hidden sm:hidden visible p-5">
          <Carousel
            indicators={true}
            autoPlay={true}
            infinite="true"
            showDots="false"
            arrows="true"
          >
            {dataPackage.map((data, i) => {
              const le = data;
              const firsPriceRp = data.price[0].priceRupiah;
              const lastPriceRp = data.price[data.price.length - 1].priceRupiah;
              const firsPriceYuan = data.price[0].priceYuan;
              const lastPriceYuan = data.price[data.price.length - 1].priceYuan;

              return (
                <div
                  key={i}
                  className="bg-white  p-[50px] rounded-lg shadow-lg h-full flex flex-col justify-between"
                >
                  <h5 className="mb-4 text-[20px] text-black font-semibold text-center line-clamp-2 h-[55px] ">
                    {language == "en" ? data.titleEnglish : data.titleChinese}
                  </h5>
                  <p className="mb-4 text-base font-medium text-blue-500 text-center">
                    {language == "en"
                      ? "Rp" + firsPriceRp + "-" + lastPriceRp
                      : firsPriceYuan + "-" + lastPriceYuan + "元"}
                  </p>

                  <div className="mb-auto pb-3 ">
                    <div className="flex space-x-3">
                      <p className="text-base my-2 font-normal leading-[24px] text-black ">
                        <span className="">
                          {language == "en" ? "Package Includes:" : "套餐包括:"}
                        </span>
                      </p>
                    </div>
                    {data.services.map((data, i) => {
                      return (
                        <div key={i} className="flex space-x-3 my-3 ">
                          <p className="text-base font-normal leading-[24px] text-black line-clamp-1 ">
                            &bull;
                            <span className="px-2">
                              {language == "en" ? data.nameIng : data.nameChi}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <a
                    className=" inline-flex w-full justify-center  bg-primary px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-cyan-200 "
                    href={`/packages/details?id=${data.id}`}
                  >
                    <p>{language == "en" ? "DETAILS" : "更详细"}</p>
                  </a>
                </div>
              );
            })}
            <></>
          </Carousel>
        </div>

        {/* desktop */}
        <div className="md:visible sm:hidden hidden bg-slate-100 w-full pt-4  md:grid md:grid-cols-3 gap-5 px-12">
          {dataPackage.map((data, i) => {
            const le = data;
            const firsPriceRp = data.price[0].priceRupiah;
            const lastPriceRp = data.price[data.price.length - 1].priceRupiah;
            const firsPriceYuan = data.price[0].priceYuan;
            const lastPriceYuan = data.price[data.price.length - 1].priceYuan;
            return (
              <div
                key={i}
                className="bg-white  p-[50px] rounded-lg shadow-lg h-full flex flex-col justify-between"
              >
                <h5 className="mb-4 text-[20px] text-black font-semibold text-center line-clamp-2 h-[55px] ">
                  {language == "en" ? data.titleEnglish : data.titleChinese}
                </h5>
                <p className="mb-4 text-[18px] leading-[28px] font-medium text-[#1e70ea] text-center">
                  {language == "en"
                    ? "Rp" + firsPriceRp + "-" + lastPriceRp
                    : firsPriceYuan + "-" + lastPriceYuan + "元"}
                </p>

                <div className="mb-auto pb-3 ">
                  <div className="flex space-x-3">
                    <p className="text-base my-2 font-normal leading-[24px] text-black ">
                      <span className="">
                        {language == "en" ? "Package Includes:" : "套餐包括:"}
                      </span>
                    </p>
                  </div>
                  {data.services.map((data, i) => {
                    return (
                      <div key={i} className="flex space-x-3 my-3 ">
                        <p className="text-base font-normal leading-[24px] text-black line-clamp-1 ">
                          &bull;
                          <span className="px-2">
                            {language == "en" ? data.nameIng : data.nameChi}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>

                <a
                  className=" inline-flex w-full justify-center  bg-primary px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-cyan-200 "
                  href={`/packages/details?id=${data.id}`}
                >
                  <p>{language == "en" ? "DETAILS" : "更详细"}</p>
                </a>
              </div>
            );
          })}
        </div>
        <div className="pb-16 pt-10 px-12">
          <div className="flex items-center justify-center font-medium text-blue-600 text-xl">
            <a href="/packages">
              {language == "en" ? "See More Packages" : "查看更多套餐"}
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.7"
              stroke="currentColor"
              aria-hidden="true"
              className="h-[1rem] w-auto mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white w-full">
        <p className="font-semibold text-3xl text-center py-6">
          {language == "en" ? "Our Clients" : "我们客户"}
        </p>

        <MultipleCarousel />
      </div>
      <CustomFooter />
    </>
  );
}

export default HomePage;

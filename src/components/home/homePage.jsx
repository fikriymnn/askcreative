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
        <Navbar />
      </div>
      
      <Landing dataHeading={dataHeading} dataParagraph={dataParagraph} />

      {/* ==== SERVICES ==== */}
      <Services />

      <div className="bg-slate-100 w-full py-4 mt-6">
        <div className="font-semibold text-3xl text-center pt-9 pb-4 ">
          <p>
            Kegiatan Terbaru
          </p>
        </div>
        <div className="w-full flex justify-center">

          <div className="grid grid-cols-2 md:grid-cols-3 md:gap-10 gap-5 md:px-20 px-5 mt-10 pb-5 w-11/12">

            {dataPackage.map((data, i) => {
              return (
                <div key={i} className="rounded-md">
                  <a href={`/events/event?id=${data.id}`}>
                    <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out  md:flex md:flex-col h-full ">
                      <div
                        className="bg-blue-700 md:mb-5 md:rounded-t-3xl rounded-s-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${data.img})` }}
                      >
                        <Image alt="" src={data.img} width={1000} height={1000} className="w-full h-full md:rounded-t-3xl rounded-s-3xl " />

                      </div>

                      <div className="px-3 pb-3 flex flex-col justify-between md:mt-0 mt-2  ">
                        <p className="lg:text-base md:text-xs sm:text-sm text-[10px] h-12 font-semibold text-black  line-clamp-2 ">

                          {data.titleEnglish}

                        </p>
                        <div>
                          <div className="flex text-[10px] md:mb-0 mb-2 lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
                            <div className="lg:mt-2">
                              {language == "en"
                                ? data.durationFrom
                                : data.durationFromValue}{" "}
                            </div>
                            <p className="lg:text-base md:text-xs sm:text-sm text-xs translate-y-[1px] md:translate-y-[4px]">
                              &#8226;
                            </p>
                            <div className="lg:mt-2">{data.timeFrom}</div>
                          </div>
                          <h2 className="text-gray-500 lg:text-base md:text-xs sm:text-sm text-xs">
                            {data.location}
                          </h2>
                          <div className=" w-full justify-between">
                            <h2 className="font-medium text-gray-800 lg:text-base md:text-xs sm:text-sm text-xs">
                              {
                                data.feeRupiah
                              }
                            </h2>
                            <h2 className="lg:text-base md:text-xs sm:text-sm text-xs">Available Quota : {data.quota}</h2>

                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
            }

          </div>
        </div>



        <div className="pb-16 pt-10 px-12">
          <div className="flex items-center justify-center font-medium text-blue-600 text-xl">
            <a href="/packages">
              {language == "en" ? "Lihat lebih banyak kegiatan" : "查看更多套餐"}
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
      <p className="font-semibold text-3xl text-center pt-3 pb-6 ">
        {language == "en" ? "Artikel Terbaru" : "最新文章"}
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
                text={language == "en" ? data.title : data.titleChinese}
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
        <div className=" flex flex-col md:mt-0 mt-2">
          {dataArticle4.map((data, i) => {
            const secon = data.createdAt.seconds;
            const date = new Date(secon * 1000);
            // Format tanggal
            const formattedDate = format(date, "yyyy-MM-dd");
            return (
              <a key={i} href={`/articles/article?id=${data.id}`}>
                <div className="cursor-pointer border-b-[2px] border-[#031530]  my-4 md:mb-3 md:mt-0">
                  <div className="font-semibold text-xl leading-[30px] hover:underline line-clamp-2">
                    {language == "en" ? data.title : data.title}
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
                <p>{language == "en" ? "Lihat lebih banyak artikel" : "查看更多"}</p>
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
      <div className="bg-white w-full mt-20">
        <p className="font-semibold text-3xl text-center py-6">
          {language == "en" ? "Galeri Kegiatan" : "我们客户"}
        </p>

        <MultipleCarousel />
      </div>
      <CustomFooter />
    </>
  );
}

export default HomePage;

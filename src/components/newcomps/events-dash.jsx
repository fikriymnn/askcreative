'use client'
import React from 'react'
import Navigation from "@/components/admin/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import EventCard from "@/components/EventCard";
import CustomFooter from "@/components/CustomFooter";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import parse from "html-react-parser";
import { format } from "date-fns";
import Navbar from "../newcomps/navbar";
import Image from "next/image";


function EventDash({dataEvents}) {
const { language, changeLanguage } = useLanguage();
  const [dataEventsResult, setDataEventsResult] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e);
    const results = dataEvents.filter((item) =>
      language == "en"
        ? item.titleEnglish.toLowerCase().includes(search.toLowerCase())
        : item.titleChinese.toLowerCase().includes(search.toLowerCase())
    );
    setDataEventsResult(results);
  };

  return (
    <div>
      <div className="flex">
        <Navigation />
        <div className="w-full h-screen p-5">
          <div className="bg-white rounded-ss-[100px]">
          <div className="flex justify-between items-center ">
            <h1 className="text-[#0E2233] text-3xl font-bold">Events Overview</h1>
            <div className="relative z-10 ">
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by title..."
                className="w-12/12 z-10 h-12 pl-4 pr-10 rounded-md border-none bg-gray-200 focus:outline-none !important"
              />
              
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 px-5 pb-5 py-5">
            {search == ""
              ? dataEvents.map((data, i) => {
                return (
                  <div key={i} className="rounded-md">
                    <a href={`/events/event?id=${data.id}`}>
                      <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out grid grid-cols-2 md:flex md:flex-col h-full ">
                        <div
                          className="bg-blue-700 md:mb-5 md:rounded-t-3xl rounded-s-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${data.img})` }}
                        >
                          <Image alt="" src={data.img} width={100} height={100} className="w-full h-full md:rounded-t-3xl rounded-s-3xl" />

                        </div>

                        <div className="px-3 pb-3 flex flex-col justify-between ">
                          <p className="lg:text-base md:text-xs sm:text-sm text-xs h-12 font-semibold text-black line-clamp-2  ">

                            {data.titleEnglish}

                          </p>
                          <div>
                            <div className="lg:flex text-[11px] lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
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
              : dataEventsResult.map((data, i) => {
                return (
                  <div key={i} className="rounded-md">
                    <a href={`/events/event?id=${data.id}`}>
                      <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out grid grid-cols-2 md:flex md:flex-col h-full ">
                        <div
                          className="bg-blue-700 mb-5 rounded-t-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${data.img})` }}
                        >
                          <Image alt="" src={data.img} width={100} height={100} className="w-full h-full rounded-t-3xl" />

                        </div>

                        <div className="px-3 pb-3 flex flex-col justify-between ">
                          <p className="lg:text-base md:text-xs sm:text-sm text-xs h-12 font-semibold text-black line-clamp-2  ">

                            {data.titleEnglish}

                          </p>
                          <div>
                            <div className="lg:flex text-[11px] lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
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
                              <h2 className="lg:text-base md:text-xs sm:text-sm text-xs">Available Quota : 20</h2>

                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default EventDash

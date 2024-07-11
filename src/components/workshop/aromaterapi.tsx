"use client";
import React from "react";
import CardTwo from "@/components/CardTwo";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "../newcomps/navbar";
import Image from "next/image";

function Aromaterapi({ title,description, layanan, images }: { title: String, description:String , layanan:any, images:any}) {
    const { language, changeLanguage } = useLanguage();
    return (
        <>
            <Navbar />
            
     
          <>
            <div  className="bg-gray-200 pt-44 pb-5 ps-5 pe-5 flex flex-col items-center">
              <div className="flex pb-5 gap-1 w-10/12 justify-start">
                <p>Workshop </p> <p>&gt;</p>
                <p className="text-blue-600">
                  {title}
                </p>
              </div>
              <div className="bg-white w-10/12">
                <div className="relative px-5 pt-5">
                  <div className="md:flex sm:grid sm:grid-cols-1 grid grid-cols-1 mb-5">
                    <div
                      className="bg-gray-100 md:w-[500px] md:h-[300px]  mt-2 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${images})`,
                      }}
                    ></div>
                    <div className="md:ps-5 ps-">
                      <p className="md:text-2xl text-2xl pb-4">
                        {title}
                      </p>
                      <div className="flex gap-1 pb-6">
                        {description}
                      </div>



                    </div>
                  </div>
                  <div className="text-2xl font-medium">
                    <p> {language == "en" ? "Kegiatan: " : "服务: "}</p>
                  </div>

                  {/* ======== */}
                  <div className="flex flex-wrap pb-5 pt-2 scale-95 gap-5">

                    <div  className="rounded-md">
                      <a href={`/events/event?id=M9T3vkTC3WVN0boZee4u

`}>
                        <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out grid grid-cols-2 md:flex md:flex-col h-full ">
                          <div
                            className="bg-blue-700 md:mb-5 md:rounded-t-3xl rounded-s-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: `url(${'https://firebasestorage.googleapis.com/v0/b/askcreative-1d7c7.appspot.com/o/galleries%2FIMG-20231109-WA0000.jpg?alt=media&token=30f72647-8ae8-41fb-9c7a-0b9d5e2c8963'})` }}
                          >
                            <Image alt="" src={'https://firebasestorage.googleapis.com/v0/b/askcreative-1d7c7.appspot.com/o/galleries%2FIMG-20231109-WA0000.jpg?alt=media&token=30f72647-8ae8-41fb-9c7a-0b9d5e2c8963'} width={100} height={100} className="w-full h-full md:rounded-t-3xl rounded-s-3xl" />

                          </div>

                          <div className="px-3 pb-3 flex flex-col justify-between ">
                            <p className="lg:text-base md:text-xs sm:text-sm text-xs h-12 font-semibold text-black line-clamp-2  ">

                              {/* {data.titleEnglish} */}
                              Workshop Parfum

                            </p>
                            <div>
                              <div className="lg:flex text-[11px] lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
                                <div className="lg:mt-2">
                                  {/* {language == "en"
                                    ? data.durationFrom
                                    : data.durationFromValue}{" "} */}
                                     23 July 2024 
                                </div>
                                <p className="lg:text-base md:text-xs sm:text-sm text-xs translate-y-[1px] md:translate-y-[4px]">
                                  &#8226;
                                </p>
                                <div className="lg:mt-2">
                                  {/* {data.timeFrom} */}
                                  23 July 2024</div>
                              </div>
                              <h2 className="text-gray-500 lg:text-base md:text-xs sm:text-sm text-xs">
                                {/* {data.location} */}
                                FAB LAB, Universitas Pendidikan Indonesia
                              </h2>
                              <div className=" w-full justify-between">
                                <h2 className="font-medium text-gray-800 lg:text-base md:text-xs sm:text-sm text-xs">
                                  {/* {
                                    data.feeRupiahksdjlfdfjlksfnkl
                                  } */}
                                  200.000
                                </h2>
                                <h2 className="lg:text-base md:text-xs sm:text-sm text-xs">Kuota Tersedia : 1</h2>

                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>




                  </div>
                  
                
                </div>
              </div>
            </div>
          </>
      
     
            <CustomFooter />
        </>
    );
}

export default Aromaterapi;

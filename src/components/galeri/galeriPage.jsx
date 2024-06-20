
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import EventCard from "@/components/EventCard";
import CustomFooter from "@/components/CustomFooter";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import parse from "html-react-parser";
import { format } from "date-fns";
import Navbar from "../newcomps/navbar";
import Image from "next/image";

function GaleriPage({ dataGaleri }) {

    return (
        <>
            <div className="z-50">
                <Navbar />
            </div>
            <div className="bg-gray-200 min-h-[700px]  pt-24 pb-5 ps-5 pe-5 ">
                <div className="bg-white rounded-ss-[100px]">
                    <div className="flex justify-between   z-10 p-5 pt-8 mb-10 px-10 mt-20 mx-5">
                        <h1 className="text-[#0E2233] text-4xl font-bold">Galeri</h1>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pb-5">

                        {/* {dataGaleri.map((data, i) => (
                            <>
                                <div key={i}>


                                    {data.date}dddd
                                </div>
                                <Image src={data.img} alt="" width={200} height={200} />

                            </>
                        ))} */}

                        {dataGaleri.map((data, i) => (
                            <>

                                <div className="flex flex-col justify-center items-center w-96 h-96">
                                    <Image alt="" src={data.img} width={400} height={400} className="w-96 h-96" />
                                    <h2 className="font-semibold">{data.title}</h2>
                                    <p className="font-medium text-sm text-gray-600">{data.date}</p>
                                </div>
                            </>
                        ))}


                    </div>
                </div>
            </div>
            <CustomFooter /></>
    )
}

export default GaleriPage
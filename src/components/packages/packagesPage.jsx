"use client";
import React from "react";
import CardTwo from "@/components/CardTwo";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "../newcomps/navbar";

function PackagesPage({ dataPackage }) {
  const { language, changeLanguage } = useLanguage();
  return (
    <>
      <Navbar />
      <div className="bg-slate-100 pt-36   w-full py-4 ">

        <div className="bg-slate-100 w-full pt-4 mt-6 md:grid md:grid-cols-3 grid grid-cols-1  gap-3 px-12 h-full ">
          {dataPackage.map((data, i) => {
            const le = data;
            // const firsPriceRp = data.price[0].priceRupiah;
            // const lastPriceRp = data.price[data.price.length - 1].priceRupiah;
            // const firsPriceYuan = data.price[0].priceYuan;
            // const lastPriceYuan = data.price[data.price.length - 1].priceYuan;

            return (
              <>
                <div
                  key={i}
                  className="bg-white p-[50px] rounded-lg shadow-lg h-full flex flex-col justify-between"
                >
                  <h5 className="mb-4 bg- text-[20px]  text-black font-semibold text-center  h-[55px] line-clamp-2">
                    {data.title}
                  </h5>
                  <p className="mb-4 text-[18px] font-medium leading-[28px] text-[#1e70ea] text-center">
                    {data.price}
                  </p>

                  <ol className="mb-auto pb-3 ">
                    <li className="flex space-x-3">
                      <p className="leading-[24px] text-base my-2 font-normal  text-black ">
                        <span className="">
                          {data.description}
                        </span>
                      </p>
                    </li>
                    {/* {data.workshop.map((data, i) => {
                      return (
                        <>
                          <div
                            key={i}
                            className="flex space-x-3 my-3 leading-[24px]"
                          >
                            <p className="text-base font-normal leading-tight text-black line-clamp-1 ">
                              &bull;{" "}
                              <span className="px-2">{data.name}</span>
                            </p>
                          </div>
                        </>
                      );
                    })} */}
                  </ol>

                  <a
                    className=" inline-flex w-full justify-center  bg-[#184737] px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-cyan-200 "
                    href={`/packages/details?id=${data.id}`}
                  >
                    <p>{language == "en" ? "DETAILS" : "更详细"}</p>
                  </a>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <CustomFooter />
    </>
  );
}

export default PackagesPage;

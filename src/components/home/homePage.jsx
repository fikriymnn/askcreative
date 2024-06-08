"use client";
import React from "react";
import Image from "next/image";
import MainCard from "@/components/MainCard";
import CustomCard from "@/components/CustomCard";
// import CardTwo from "@/components/CardTwo";
import MultipleCarousel from "@/components/MultipleCarousel";
import Link from "next/link";

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
        <HomeNavbarWithCTAButton height={500} />
      </div>
      <div className="bg-black">
        <div className='flex items-center justify-center bg-left bg-cover bg-[url("/assets/images/bgtys.png")] text-white'>
          <div
            className={
              language == "en"
                ? "w-full h-full flex items-center bakg  p-5 lg:px-[10%] py-[20vh] lg:py-[30vh]  "
                : "w-full h-full flex items-center bakg  p-5 lg:px-[10%] py-[30vh] lg:py-[38vh] "
            }
          >
            <div className="flex flex-col text-left lg:max-w-[50%]">
              <div className="font-semibold text-[1.75rem] lg:text-[2.5rem]">
                {dataHeading.map((data, i) => {
                  return (
                    <p key={i}>
                      {language == "en" ? data.english : data.chinese}
                    </p>
                  );
                })}
              </div>
              <div className="mt-2 lg:text-[1.2rem]">
                {dataParagraph.map((data, i) => {
                  return (
                    <div key={i}>
                      {language == "en" ? data.english : data.chinese}
                    </div>
                  );
                })}
              </div>
              <a
                href="#about"
                className="bg-primary w-fit px-5 font-semibold py-3 mt-6 flex items-center space-x-2 cursor-pointer hover:brightness-110 transition-all"
              >
                <div>{language == "en" ? "GET STARTED" : "开始看看"}</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==== SERVICES ==== */}
      <p id="about" className="font-semibold text-3xl text-center pt-14 pb">
        {language == "en" ? "What Services We Offer" : "我们提供的服务"}
      </p>
      <div
        id="getstart"
        className="md:grid sm:grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:pb-10 md:pt-6 md:px-10 pb-10 px-7 py-7"
      >
        <div className="group block md:rounded-lg sm:rounded-lg rounded-none md:px-7 md:py-4 p-0 md:bg-white sm:bg-white bg-blue-600 shadow-lg  md:hover:bg-blue-600 sm:hover:bg-blue-600 group-hover:text-white first-linexport service-list hover:bg-primary md:hover:text-white sm:hover:text-white cursor-pointer transition-all  border-2">
          <div
            className="flex items-baseline text-gray-900 md:text-[#007aff]  
                      pl-[1px] pr-0 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="service-icon icon-effect h-[2rem] lg:h-[2.5rem] w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              ></path>
            </svg>
            {/* translate-x-10 absolute mt-[3px] */}
            <a
              href="/services/basicEstablish?comp=0"
              className="  md:border-none ml-[1px] text-[20px] font-semibold my-auto  md:text-black sm:text-black text-white  group-hover:text-white  pl-2 w-full "
            >
              {language == "en" ? "Basic Establishment Services" : "基础服务"}
            </a>
          </div>
          <hr className="" />
          <div className="my-5 space-y-5">
            <div className="flex space-x-3 ">
              <a
                href="/services/basicEstablish?comp=0"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Company Registration" : "公司注册"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/basicEstablish?comp=1"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Visa Registration" : "签证办理"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/basicEstablish?comp=2"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Trademark" : "商标"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/basicEstablish?comp=3"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Office Administration" : "行政办公"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/basicEstablish?comp=4"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Construction Certifications" : "建筑工程"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3">
              <a
                href="/services/basicEstablish/?comp=5"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white  group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Factory Licenses" : "工厂许可"}
              </a>
            </div>
            <hr className="" />
          </div>
        </div>

        <div className="group block md:rounded-lg sm:rounded-lg rounded-none md:px-7 md:py-4 p-0 md:bg-white sm:bg-white bg-blue-600 shadow-lg  md:hover:bg-blue-600 sm:hover:bg-blue-600 group-hover:text-white first-linexport service-list hover:bg-primary md:hover:text-white sm:hover:text-white cursor-pointer transition-all  border-2">
          <div
            className="flex items-baseline text-gray-900 md:text-[#007aff]  
                       pl-1 pr-0 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="service-icon icon-effect h-[2rem] lg:h-[2.5rem] w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              ></path>
            </svg>
            <a
              href="/services/productCertifications?comp=0"
              className=" md:border-none ml-1 text-[20px] font-semibold my-auto  md:text-black sm:text-black text-white  group-hover:text-white pl-3 "
            >
              {language == "en" ? "Product Certifications" : "产品认证"}
            </a>
          </div>
          <hr className="" />
          <div className="my-5 space-y-5">
            <div className="flex space-x-3 ">
              <a
                href="/services/productCertifications?comp=0"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "BPOM Food and Drug" : "BPOM 食药化妆"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/productCertifications?comp=1"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "ISO Management System" : "ISO 管理体系"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/productCertifications?comp=2"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "SNI National Standard" : "SNI 国家标准"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/productCertifications?comp=3"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Medical and Hygiene" : "医疗卫生 PKRT"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/productCertifications?comp=4"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en"
                  ? "POSTEL Telecommunication"
                  : "POSTEL 电通信"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3">
              <a
                href="/services/productCertifications?comp=5"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white  group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Alcohol And Cigarette" : "酒和烟证"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3">
              <a
                href="/services/productCertifications?comp=6"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white  group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Other Certification" : "其他证"}
              </a>
            </div>
            <hr className="" />
          </div>
        </div>

        <div className="group block md:rounded-lg sm:rounded-lg rounded-none md:px-7 md:py-4 p-0 md:bg-white sm:bg-white bg-blue-600 shadow-lg  md:hover:bg-blue-600 sm:hover:bg-blue-600 group-hover:text-white first-linexport service-list hover:bg-primary md:hover:text-white sm:hover:text-white cursor-pointer transition-all  border-2">
          <div
            className="flex items-baseline text-gray-900 md:text-[#007aff]  
                       pl-1 pr-0 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="service-icon icon-effect h-[2rem] lg:h-[2.5rem] w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <a
              href="/services/financeAccountingTax?comp=0"
              className=" md:border-none ml-1 text-[20px] font-semibold my-auto  md:text-black sm:text-black text-white  group-hover:text-white pl-3 "
            >
              {language == "en" ? "Finance Acounting Tax" : "财税会计服务"}
            </a>
          </div>
          <hr className="" />
          <div className="my-5 space-y-5">
            <div className="flex space-x-3 ">
              <a
                href="/services/financeAccountingTax?comp=0"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Finance Services" : "财务服务"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/financeAccountingTax?comp=1"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Accounting Services" : "会计服务"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/financeAccountingTax?comp=2"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline "
              >
                {language == "en" ? "Tax Services" : "税务服务"}
              </a>
            </div>
            <hr className="" />
          </div>
        </div>

        <div className="group block md:rounded-lg sm:rounded-lg rounded-none md:px-7 md:py-4 p-0 md:bg-white sm:bg-white bg-blue-600 shadow-lg  md:hover:bg-blue-600 sm:hover:bg-blue-600 group-hover:text-white first-linexport service-list hover:bg-primary md:hover:text-white sm:hover:text-white cursor-pointer transition-all  border-2">
          <div
            className="flex items-baseline text-gray-900 md:text-[#007aff]  
                       pl-1 pr-0 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="service-icon icon-effect h-[2rem] lg:h-[2.5rem] w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              ></path>
            </svg>
            <a
              href="/services/TalentRecruitmentHR?comp=0"
              className=" md:border-none ml-1 text-[20px] font-semibold my-auto  md:text-black sm:text-black text-white  group-hover:text-white pl-3 "
            >
              {language == "en" ? "Talent Recruitment HR" : "人才招聘和人事"}
            </a>
          </div>
          <hr className="" />
          <div className="my-5 space-y-5">
            <div className="flex space-x-3 ">
              <a
                href="/services/TalentRecruitmentHR?comp=0"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Translator Assistant" : "翻译助理"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/TalentRecruitmentHR?comp=1"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Finance Accounting Tax" : "财税会计"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/TalentRecruitmentHR?comp=2"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Marketing Sales" : "销售和营销"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/TalentRecruitmentHR?comp=3"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Management Candidate" : "管理人选"}
              </a>
            </div>
            <hr className="" />
            <div className="flex space-x-3 ">
              <a
                href="/services/TalentRecruitmentHR?comp=4"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "HR Management Service" : "人事管理服务"}
              </a>
            </div>
            <hr className="" />
          </div>
        </div>

        <div className="group block md:rounded-lg sm:rounded-lg rounded-none md:px-7 md:py-4 p-0 md:bg-white sm:bg-white bg-blue-600 shadow-lg  md:hover:bg-blue-600 sm:hover:bg-blue-600 group-hover:text-white first-linexport service-list hover:bg-primary md:hover:text-white sm:hover:text-white cursor-pointer transition-all  border-2">
          <div
            className="flex items-baseline text-gray-900 md:text-[#007aff]  
                       pl-1 pr-0 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="service-icon icon-effect h-[2rem] lg:h-[2.5rem] w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              ></path>
            </svg>
            <a
              href="/services/LegalServices?comp=0"
              className=" md:border-none ml-1 text-[20px] font-semibold my-auto  md:text-black sm:text-black text-white  group-hover:text-white pl-3 "
            >
              {language == "en" ? "Legal Services" : "法律服务"}
            </a>
          </div>
          <hr className="" />
          <div className="my-5 space-y-5">
            <div className="flex space-x-3 ">
              <a
                href="/services/LegalServices?comp=0"
                className="text-base font-normal leading-3 md:text-black sm:text-black text-white group-hover:text-white pl-3 hover:underline"
              >
                {language == "en" ? "Legal Administration" : "法律行政"}
              </a>
            </div>
          </div>
        </div>
      </div>
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
            {language == "en"
              ? "Choose The Best Package You Need"
              : "选择您需要的服务包"}
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

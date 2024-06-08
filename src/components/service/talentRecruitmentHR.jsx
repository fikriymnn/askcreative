"use client";
import React from "react";
import CompanyRegistrationPage from "@/components/ServicesSub/BasicEstablishmentServices/CompanyRegistrationPage";
import { useState, useEffect } from "react";
import { Tabs } from "flowbite-react";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";

import TranslatorAssistant from "@/components/ServicesSub/TalentRecruitmentHR/TranslatorAssistant";
import FinanceAccountingTax from "@/components/ServicesSub/TalentRecruitmentHR/FinanceAccountingTax";
import CustomFooter from "@/components/CustomFooter";
import MarketingSales from "@/components/ServicesSub/TalentRecruitmentHR/MarketingSales";
import ManagementCandidate from "@/components/ServicesSub/TalentRecruitmentHR/ManagementCandidate";
import HRManagementService from "@/components/ServicesSub/TalentRecruitmentHR/HRManagementService";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";

function TalentRecruitmentHR({
  dataTalentTranslator,
  dataTalentFinance,
  dataTalentMarketing,
  dataTalentMenagement,
  dataTalentHR,
}) {
  const { language, changeLanguage } = useLanguage();
  const [comp, setComp] = useState(0);
  const searchParams = useSearchParams();
  const id = searchParams.get("comp");

  useEffect(() => {
    getCom(id);
  }, [id]);

  const getCom = async (comp) => {
    const a = parseInt(comp);
    setComp(a);
  };
  return (
    <>
      <NavbarWithCTAButton />
      <div className="bg-gray-200 pt-24 pb-5 ps-5 pe-5 min-h-[700px]">
        <div className="flex pb-5">
          <p>{language == "en" ? "Services " : "服务 "} </p>{" "}
          <p className="text-blue-600 ml-1">
            &gt; {language == "en" ? "Talent Recruitment HR" : "人才招聘和人事"}
          </p>
        </div>
        <div className="bg-white">
          <div className="p-5 pt-3">
            <div className="overflow-auto w-full">
              <div className="flex gap-9 border-b md:w-full sm:w-[1000px] w-[1100px]  md:h-full sm:h-full h-16 ">
                <button
                  onClick={() => setComp(0)}
                  className={`${
                    comp == 0
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "Translator Assistant" : "翻译助理"}
                </button>
                <button
                  onClick={() => setComp(1)}
                  className={`${
                    comp == 1
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "Finance Accounting Tax" : "财税会计"}
                </button>
                <button
                  onClick={() => setComp(2)}
                  className={`${
                    comp == 2
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "Marketing Sales" : "销售和营销"}
                </button>
                <button
                  onClick={() => setComp(3)}
                  className={`${
                    comp == 3
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "Management Candidate" : "管理人选"}
                </button>
                <button
                  onClick={() => setComp(4)}
                  className={`${
                    comp == 4
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "HR Management Service" : "人事管理服务"}
                </button>
              </div>
            </div>
          </div>
          {comp == 0 ? (
            <>
              <div className="grid md:grid-cols-5 md:grid sm:grid sm:grid-cols-3 grid-cols-1  gap-5 px-5 pb-5">
                {dataTalentTranslator.map((data, i) => {
                  const le = data;
                  const firsPriceRp = data.price[0].priceRupiah;
                  const lastPriceRp =
                    data.price[data.price.length - 1].priceRupiah;
                  const firsPriceYuan = data.price[0].priceYuan;
                  const lastPriceYuan =
                    data.price[data.price.length - 1].priceYuan;
                  return (
                    <>
                      <div key={i}>
                        <a href={`/services/detail?id=${data.id}`}>
                          <div className="bg-white shadow-xl hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2 md:h-72">
                            <div
                              className="  h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${data.img})` }}
                            ></div>
                            <div className="p-3 md:w-full sm:w-full w-11/12 md:h-20">
                              <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                {language == "chi" ? data.titleChinese : ""}
                                {language == "en"
                                  ? data.titleEnglish
                                  : data.titleEnglish}
                              </h1>
                              <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                {language == "en"
                                  ? "Rp" + firsPriceRp + "-" + lastPriceRp
                                  : firsPriceYuan + "-" + lastPriceYuan + "元"}
                              </h2>
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : comp == 1 ? (
            <>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1   gap-5 px-5 pb-5">
                {dataTalentFinance.map((data, i) => {
                  const le = data;
                  const firsPriceRp = data.price[0].priceRupiah;
                  const lastPriceRp =
                    data.price[data.price.length - 1].priceRupiah;
                  const firsPriceYuan = data.price[0].priceYuan;
                  const lastPriceYuan =
                    data.price[data.price.length - 1].priceYuan;
                  return (
                    <>
                      <div key={i}>
                        <a href={`/services/detail?id=${data.id}`}>
                          <div className="bg-white shadow-xl hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2 md:h-72">
                            <div
                              className="  h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${data.img})` }}
                            ></div>
                            <div className="p-3 md:w-full sm:w-full w-11/12 md:h-20">
                              <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                {language == "chi" ? data.titleChinese : ""}
                                {language == "en"
                                  ? data.titleEnglish
                                  : data.titleEnglish}
                              </h1>
                              <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                {language == "en"
                                  ? "Rp" + firsPriceRp + "-" + lastPriceRp
                                  : firsPriceYuan + "-" + lastPriceYuan + "元"}
                              </h2>
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : comp == 2 ? (
            <>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1   gap-5 px-5 pb-5">
                {dataTalentMarketing.map((data, i) => {
                  const le = data;
                  const firsPriceRp = data.price[0].priceRupiah;
                  const lastPriceRp =
                    data.price[data.price.length - 1].priceRupiah;
                  const firsPriceYuan = data.price[0].priceYuan;
                  const lastPriceYuan =
                    data.price[data.price.length - 1].priceYuan;
                  return (
                    <>
                      <div key={i}>
                        <a href={`/services/detail?id=${data.id}`}>
                          <div className="bg-white shadow-xl hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2 md:h-72">
                            <div
                              className="  h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${data.img})` }}
                            ></div>
                            <div className="p-3 md:w-full sm:w-full w-11/12 md:h-20">
                              <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                {language == "chi" ? data.titleChinese : ""}
                                {language == "en"
                                  ? data.titleEnglish
                                  : data.titleEnglish}
                              </h1>
                              <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                {language == "en"
                                  ? "Rp" + firsPriceRp + "-" + lastPriceRp
                                  : firsPriceYuan + "-" + lastPriceYuan + "元"}
                              </h2>
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : comp == 3 ? (
            <>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1   gap-5 px-5 pb-5">
                {dataTalentMenagement.map((data, i) => {
                  const le = data;
                  const firsPriceRp = data.price[0].priceRupiah;
                  const lastPriceRp =
                    data.price[data.price.length - 1].priceRupiah;
                  const firsPriceYuan = data.price[0].priceYuan;
                  const lastPriceYuan =
                    data.price[data.price.length - 1].priceYuan;
                  return (
                    <>
                      <div key={i}>
                        <a href={`/services/detail?id=${data.id}`}>
                          <div className="bg-white shadow-xl hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2 md:h-72">
                            <div
                              className="  h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${data.img})` }}
                            ></div>
                            <div className="p-3 md:w-full sm:w-full w-11/12 md:h-20">
                              <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                {language == "chi" ? data.titleChinese : ""}
                                {language == "en"
                                  ? data.titleEnglish
                                  : data.titleEnglish}
                              </h1>
                              <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                {language == "en"
                                  ? "Rp" + firsPriceRp + "-" + lastPriceRp
                                  : firsPriceYuan + "-" + lastPriceYuan + "元"}
                              </h2>
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : comp == 4 ? (
            <>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1   gap-5 px-5 pb-5">
                {dataTalentHR.map((data, i) => {
                  const le = data;
                  const firsPriceRp = data.price[0].priceRupiah;
                  const lastPriceRp =
                    data.price[data.price.length - 1].priceRupiah;
                  const firsPriceYuan = data.price[0].priceYuan;
                  const lastPriceYuan =
                    data.price[data.price.length - 1].priceYuan;
                  return (
                    <>
                      <div key={i}>
                        <a href={`/services/detail?id=${data.id}`}>
                          <div className="bg-white shadow-xl hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2 md:h-72">
                            <div
                              className="  h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${data.img})` }}
                            ></div>
                            <div className="p-3 md:w-full sm:w-full w-11/12 md:h-20">
                              <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                {language == "chi" ? data.titleChinese : ""}
                                {language == "en"
                                  ? data.titleEnglish
                                  : data.titleEnglish}
                              </h1>
                              <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                {language == "en"
                                  ? "Rp" + firsPriceRp + "-" + lastPriceRp
                                  : firsPriceYuan + "-" + lastPriceYuan + "元"}
                              </h2>
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            false
          )}
        </div>
      </div>
      <CustomFooter />
    </>
  );
}

export default TalentRecruitmentHR;

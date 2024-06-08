"use client";
import React from "react";
import CompanyRegistrationPage from "@/components/ServicesSub/BasicEstablishmentServices/CompanyRegistrationPage";
import { Tabs } from "flowbite-react";
import BPOMFoodDrug from "@/components/ServicesSub/ProductCertificationsServices/BPOMFoodDrug";
import ISOManagementSystem from "@/components/ServicesSub/ProductCertificationsServices/ISOManagementSystem";
import SNINationalStandard from "@/components/ServicesSub/ProductCertificationsServices/SNINationalStandard";
import MedicalAndHygiene from "@/components/ServicesSub/ProductCertificationsServices/MedicalAndHygiene";
import POSTELTelecommunication from "@/components/ServicesSub/ProductCertificationsServices/POSTELTelecommunication";
import AlcoholAndCigarette from "@/components/ServicesSub/ProductCertificationsServices/AlcoholAndCigarette";
import OtherCer from "@/components/ServicesSub/ProductCertificationsServices/OtherCer";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function ProductCertification({
  dataProductBPOM,
  dataProductISO,
  dataProductSNI,
  dataProductMedical,
  dataProductPostel,
  dataProductAlcohol,
  dataProductOther,
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
          <p>{language == "en" ? "Services" : "服务"}</p>{" "}
          <p className="text-blue-600 ml-1">
            &gt; {language == "en" ? "Product Certification" : "产品认证"}
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
                  {language == "en" ? "BPOM Food & Drug " : "BPOM 食药化妆"}
                </button>
                <button
                  onClick={() => setComp(1)}
                  className={`${
                    comp == 1
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {" "}
                  {language == "en" ? "ISO Management System" : "ISO 管理体系"}
                </button>
                <button
                  onClick={() => setComp(2)}
                  className={`${
                    comp == 2
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {" "}
                  {language == "en" ? "SNI National Standard" : "SNI 国家标准"}
                </button>
                <button
                  onClick={() => setComp(3)}
                  className={`${
                    comp == 3
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {" "}
                  {language == "en" ? "Medical and Hygiene" : "医疗卫生 PKRT"}
                </button>
                <button
                  onClick={() => setComp(4)}
                  className={`${
                    comp == 4
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en"
                    ? "POSTEL Telecommunication"
                    : "POSTEL 电通信"}
                </button>
                <button
                  onClick={() => setComp(5)}
                  className={`${
                    comp == 5
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "Alcohol and Cigarette" : "酒和烟证"}
                </button>
                <button
                  onClick={() => setComp(6)}
                  className={`${
                    comp == 6
                      ? "text-blue-600 border-b pb-2 border-blue-600"
                      : "text-black border-0"
                  } md:text-base sm:text-sm text-sm`}
                >
                  {language == "en" ? "Other Certification" : "其他证"}
                </button>
              </div>
            </div>
          </div>
          {comp == 0 ? (
            <>
              <div className="grid md:grid-cols-5 md:grid sm:grid sm:grid-cols-3 grid-cols-1  gap-5 px-5 pb-5">
                {dataProductBPOM.map((data, i) => {
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
                {dataProductISO.map((data, i) => {
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
                {dataProductSNI.map((data, i) => {
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
                {dataProductMedical.map((data, i) => {
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
                {dataProductPostel.map((data, i) => {
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
          ) : comp == 5 ? (
            <>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1   gap-5 px-5 pb-5">
                {dataProductAlcohol.map((data, i) => {
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
              </div>{" "}
            </>
          ) : comp == 6 ? (
            <>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1   gap-5 px-5 pb-5">
                {dataProductOther.map((data, i) => {
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
              </div>{" "}
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

export default ProductCertification;

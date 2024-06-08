"use client";
import React from "react";
import CustomFooter from "@/components/CustomFooter";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function LegalServicePage({ dataLegalAdministration }) {
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
          <p>{language == "en" ? "Services" : "服务"} </p>{" "}
          <p className="text-blue-600 ml-1">
            {" "}
            &gt; {language == "en" ? "Legal Services" : "法律服务"}
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
                  {language == "en" ? "Legal Administration" : "法律行政"}
                </button>
              </div>
            </div>
          </div>
          {comp == 0 ? (
            <>
              <div className="grid md:grid-cols-5 md:grid sm:grid sm:grid-cols-3 grid-cols-1  gap-5 px-5 pb-5">
                {dataLegalAdministration.map((data, i) => {
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

export default LegalServicePage;

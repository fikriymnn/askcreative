"use client";
import React from "react";
import PoliciesDetail from "@/components/PoliciesDetail";
import Image from "next/image";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import { useLanguage } from "@/context/LanguageContext";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

function PoliciesPage({ dataForeigen, dataTak, dataLabor, dataImport }) {
  const { language, changeLanguage } = useLanguage();
  const [dropdown, setDropdown] = useState(true);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);
  const [titleIng, setTitleIng] = useState("");
  const [titleChi, setTitleChi] = useState("");
  const [desChi, setDesChi] = useState("");
  const [desIng, setDesIng] = useState("");
  const [content, setContent] = useState([]);

  const [dataimg, setDataImg] = useState("");
  const [selectedDetail1, setSelectedDetail1] = useState(0);
  const [selectedDetail2, setSelectedDetail2] = useState();
  const [selectedDetail3, setSelectedDetail3] = useState();
  const [selectedDetail4, setSelectedDetail4] = useState();
  const forigent = dataForeigen;
  const tax = dataTak;
  const labor = dataLabor;
  const importt = dataImport;

  forigent.sort(function (a, b) {
    if (a.subCategoryEnglish < b.subCategoryEnglish) {
      return -1;
    }
    if (a.subCategoryEnglish > b.subCategoryEnglish) {
      return 1;
    }
    return 0;
  });

  tax.sort(function (a, b) {
    if (a.subCategoryEnglish < b.subCategoryEnglish) {
      return -1;
    }
    if (a.subCategoryEnglish > b.subCategoryEnglish) {
      return 1;
    }
    return 0;
  });

  labor.sort(function (a, b) {
    if (a.subCategoryEnglish < b.subCategoryEnglish) {
      return -1;
    }
    if (a.subCategoryEnglish > b.subCategoryEnglish) {
      return 1;
    }
    return 0;
  });

  importt.sort(function (a, b) {
    if (a.subCategoryEnglish < b.subCategoryEnglish) {
      return -1;
    }
    if (a.subCategoryEnglish > b.subCategoryEnglish) {
      return 1;
    }
    return 0;
  });
  return (
    <>
      <NavbarWithCTAButton />
      <div>
        <div className="md:flex md:justify-evenly sm:flex sm:justify-evenly grid grid-cols-1 justify-items-center   pt-24">
          <div className="md:w-3/12 sm:w-4/12 w-10/12 mx-5 h-full bg-blue-600 ">
            <div
              className={`w-full h-16  border-y border-white flex items-center cursor-pointer ${
                dropdown ? "bg-blue-700" : ""
              }`}
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm text-start w-full">
                {language == "en"
                  ? " Foreign Company Registration"
                  : "外资公司注册"}
              </p>
              {dropdown ? (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5 rotate-180"
                />
              ) : (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5"
                />
              )}
            </div>
            {/* dropdown */}
            {dropdown && (
              <div className="border-y border-white">
                {forigent.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-full h-[60px]  border-white flex items-center cursor-pointer ${
                        selectedDetail1 == i ? "bg-blue-900" : ""
                      }`}
                      onClick={() => {
                        setContent(data.content);
                        setTitleChi(data.titleChinese);
                        setTitleIng(data.titleEnglish);
                        setDataImg(data.img);
                        setDesIng(data.descriptionEnglish);
                        setDesChi(data.descriptionChinese);
                        setSelectedDetail1(i);
                        setSelectedDetail2();
                        setSelectedDetail3();
                        setSelectedDetail4();
                      }}
                    >
                      <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm  w-full">
                        {language == "en"
                          ? data.subCategoryEnglish
                          : data.subCategoryChinese}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`w-full h-16  border-y border-white flex items-center cursor-pointer ${
                dropdown2 ? "bg-blue-700" : ""
              }`}
              onClick={() => {
                setDropdown2(!dropdown2);
              }}
            >
              <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm text-start w-full">
                {language == "en" ? "  Tax Regulation" : "税务政策"}
              </p>
              {dropdown2 ? (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5 rotate-180"
                />
              ) : (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5"
                />
              )}
            </div>
            {/* dropdown */}
            {dropdown2 && (
              <div className="border-y border-white">
                {tax.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-full h-[60px]  border-white flex items-center cursor-pointer ${
                        selectedDetail2 == i ? "bg-blue-900" : ""
                      }`}
                      onClick={() => {
                        setContent(data.content);
                        setTitleChi(data.titleChinese);
                        setTitleIng(data.titleEnglish);
                        setDataImg(data.img);
                        setDesIng(data.descriptionEnglish);
                        setDesChi(data.descriptionChinese);
                        setSelectedDetail2(i);
                        setSelectedDetail3();
                        setSelectedDetail4();
                        setSelectedDetail1();
                      }}
                    >
                      <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm  w-full">
                        {language == "en"
                          ? data.subCategoryEnglish
                          : data.subCategoryChinese}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`w-full h-16  border-y border-white flex items-center cursor-pointer ${
                dropdown3 ? "bg-blue-700" : ""
              }`}
              onClick={() => {
                setDropdown3(!dropdown3);
              }}
            >
              <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm text-start w-full">
                {language == "en" ? "  Labor Policy" : "劳动政策"}
              </p>
              {dropdown3 ? (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5 rotate-180"
                />
              ) : (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5"
                />
              )}
            </div>
            {/* dropdown */}
            {dropdown3 && (
              <div className="border-y border-white">
                {labor.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-full h-[60px]  border-white flex items-center cursor-pointer ${
                        selectedDetail3 == i ? "bg-blue-900" : ""
                      }`}
                      onClick={() => {
                        setContent(data.content);
                        setTitleChi(data.titleChinese);
                        setTitleIng(data.titleEnglish);
                        setDataImg(data.img);
                        setDesIng(data.descriptionEnglish);
                        setDesChi(data.descriptionChinese);
                        setSelectedDetail3(i);
                        setSelectedDetail2();
                        setSelectedDetail1();
                        setSelectedDetail4();
                      }}
                    >
                      <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm  w-full">
                        {language == "en"
                          ? data.subCategoryEnglish
                          : data.subCategoryChinese}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`w-full h-16  border-y border-white flex items-center cursor-pointer ${
                dropdown4 ? "bg-blue-700" : ""
              }`}
              onClick={() => {
                setDropdown4(!dropdown4);
              }}
            >
              <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm text-start w-full">
                {language == "en"
                  ? "   Import Export Procedures & Policies"
                  : "进出口手续政策"}
              </p>
              {dropdown4 ? (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5 rotate-180"
                />
              ) : (
                <Image
                  src={"/dropdown.png"}
                  width={15}
                  height={15}
                  className="mr-5"
                />
              )}
            </div>
            {/* dropdown */}
            {dropdown4 && (
              <div className="border-y border-white">
                {importt.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-full h-[60px]  border-white flex items-center cursor-pointer ${
                        selectedDetail4 == i ? "bg-blue-900" : ""
                      }`}
                      onClick={() => {
                        setContent(data.content);
                        setTitleChi(data.titleChinese);
                        setTitleIng(data.titleEnglish);
                        setDataImg(data.img);
                        setDesIng(data.descriptionEnglish);
                        setDesChi(data.descriptionChinese);
                        setSelectedDetail4(i);
                        setSelectedDetail1();
                        setSelectedDetail2();
                        setSelectedDetail3();
                      }}
                    >
                      <p className="ml-5 mr-5 text-white md:text-[15px] sm:text-xs text-sm  w-full">
                        {language == "en"
                          ? data.subCategoryEnglish
                          : data.subCategoryChinese}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className={`md:mr-5 md:w-9/12 sm:w-8/12 w-10/12 shadow-2xl mb-10 border-t mt-5 md:mt-0 sm:mt-0`}
          >
            {dataimg == "" ? (
              dataForeigen.map((data, i) => {
                return i == 0 ? (
                  <div key={i}>
                    <p className="text-center my-5 md:text-3xl sm:text-xl text-base font-bold text-blue-600">
                      {language == "en" ? data.titleEnglish : data.titleChinese}
                    </p>
                    <div className="flex items-center w-full px-5">
                      <Image
                        src={data.img}
                        width={1000}
                        height={400}
                        className="m-auto"
                        alt="Image"
                      />
                    </div>
                    <div className=" mt-10 px-5 ">
                      <div className="ql-editor  -translate-x-4">
                        {parse(
                          language == "en"
                            ? data.descriptionEnglish
                            : data.descriptionChinese
                        )}
                      </div>
                    </div>
                    {data.content.map((data, i) => {
                      return (
                        <div key={i} className="px-5 mb-5">
                          <div className="h-[2px] w-full bg-gray-300  mt-5"></div>
                          <div className="flex items-center w-full">
                            <div className=" bg-blue-600 ">
                              <p className="text-center text-white text-base font-semibold p-3">
                                {language == "en"
                                  ? data.topicIng
                                  : data.topicChi}
                              </p>
                            </div>
                            <div></div>
                          </div>
                          <div className="content py-5 ql-editor  -translate-x-4">
                            <p>
                              {parse(
                                language == "en"
                                  ? data.contentIng
                                  : data.contentChi
                              )}
                            </p>
                          </div>
                          {data.img == "" ? (
                            <></>
                          ) : (
                            <>
                              <img
                                width={500}
                                height={300}
                                src={data.img}
                                alt=""
                              ></img>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null;
              })
            ) : (
              <>
                <p className="text-center my-5 md:text-3xl sm:text-xl text-base font-bold text-blue-600">
                  {language == "en" ? titleIng : titleChi}
                </p>
                <div className="flex items-center w-full px-5">
                  <Image
                    src={dataimg}
                    width={1000}
                    height={400}
                    className="m-auto"
                    alt="Image"
                  />
                </div>
                <div className=" px-5">
                  <div className="ql-editor  -translate-x-4">
                    {parse(language == "en" ? desIng : desChi)}
                  </div>
                </div>
                {content.map((data, i) => {
                  return (
                    <>
                      <div className="px-5 mb-5">
                        <div className="h-[2px] w-full bg-gray-300 "></div>
                        <div className="flex items-center w-full">
                          <div className=" bg-blue-600 ">
                            <p className="text-center text-white text-base font-semibold p-3">
                              {language == "en" ? data.topicIng : data.topicChi}
                            </p>
                          </div>
                          <div></div>
                        </div>
                        <div className=" py-5 ql-editor  -translate-x-4">
                          <p>
                            {parse(
                              language == "en"
                                ? data.contentIng
                                : data.contentChi
                            )}
                          </p>
                        </div>
                        {
                          <>
                            {data.img.map((data, ii) => {
                              return data.img == "" ? (
                                <></>
                              ) : (
                                <img
                                  key={ii}
                                  width={500}
                                  height={300}
                                  src={data.img}
                                  alt=""
                                  className=""
                                ></img>
                              );
                            })}
                          </>
                        }
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
}

export default PoliciesPage;

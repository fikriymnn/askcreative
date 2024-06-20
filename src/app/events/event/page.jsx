"use client";

import SolidBackground from "@/components/BreadcrumbArticle";
import CustomFooter from "@/components/CustomFooter";
import BreadcrumbArticle from "@/components/BreadcrumbArticle";
import Image from "next/image";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { useSearchParams } from "next/navigation";
import FormReg from '@/components/newcomps/form-reg'
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { db, storage } from "../../../../firebase/page";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";
import X from "../../../../public/x.svg"
import Navbar from "@/components/newcomps/navbar";

function Event() {
  const { language, changeLanguage } = useLanguage();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dataEvents, setDataEvents] = useState([]);
  const [formReg, setFormReg] = useState(false);

  useEffect(() => {
    getDataEventse(id);
  }, [id]);

  async function getDataEventse(idd) {
    try {
      const docRef = doc(db, "events", idd);
      const querySnapshot = await getDoc(docRef);
      let data = [];

      data.push(querySnapshot.data());

      setDataEvents(data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 pt-44 pb-5 ps-5 pe-5">
        {dataEvents.map((data, i) => {
          const timestamp = data.createdAt.toDate();

          // Format tanggal
          const formattedDate = format(timestamp, "yyyy-MM-dd");

          return (
            <>
              <div className="md:flex justify-center items-center ">
                <div></div>
                <div className="md:w-11/12 flex flex-col items-center ">
                  <div className="py-2  gap-1 w-10/12 flex justify-start">
                    <a href="/events">
                      {language == "en" ? "Events" : "活动 "}
                    </a>
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
                    <p className="text-blue-500">
                      {data.titleEnglish}
                    </p>
                  </div>
                  <div className="bg-white md:w-10/12">
                    <div className="relative px-5">
                      <div className="w-full">
                        <div className="pt-3">
                          <p>
                            {language == "en" ? " Posted at: " : "发表日期: "}
                            {language == "en" ? data.date : formattedDate}
                          </p>
                        </div>
                        <h1 className="md:text-4xl sm:text-2xl text-2xl text-center p-5 font-semibold">
                          {language == "en"
                            ? data.titleEnglish
                            : data.titleChinese}
                        </h1>
                        <div className="">
                          <Image
                            src={data.img}
                            width={1200}
                            height={10}
                            alt=""
                          />
                        </div>
                        <div className="font-semibold">
                          <h3 className="mt-2">
                            {language == "en" ? " Location: " : "活动地点: "}
                            {data.location}
                          </h3>
                          <h3 className="mt-2">
                            {language == "en" ? " Durations: " : "活动期间: "}
                            {language == "en"
                              ? data.durationFrom
                              : data.durationFromValue}{" "}
                            -{" "}
                            {language == "en"
                              ? data.durationTo
                              : data.durationToValue}
                          </h3>
                          <h3 className="mt-2">
                            {language == "en" ? " Time: " : " 活动时间: "}{" "}
                            {data.timeFrom} - {data.timeTo}
                          </h3>
                          <div className="flex w-full justify-between">

                            <h3 className="mb-3  mt-2">
                              {language == "en" ? " Fee: " : "费用: "}
                              {language == "en" ? data.feeRupiah : data.feeYuan}
                            </h3>
                            <div>

                              <h2 className=" mt-2">Available Quota: {data.quota}</h2>
                              {
                                data.quota <= 0 ? (
                                  <>
                                    <button className="mb-3 mt-1 bg-gray-600 text-white text-lg  font-semibold px-10 py-1">Sold</button>
                                  </>
                                ) : (
                                  <>

                                    <button onClick={() => setFormReg(!formReg)} className="mb-3 mt-1 bg-green-600 text-white text-lg  font-semibold px-10 py-1">Registration</button>
                                  </>
                                )
                              }

                            </div>
                            {formReg == true && (
                             <FormReg
                             roles={data.roles}
                             formregx={
                              <div className="flex justify-end m-2 " onClick={() => setFormReg(!formReg)}>
                                      <svg width="25" height="25" viewBox="0 0 294 294" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="147" cy="147" r="147" fill="#FF0000" />
                                        <path d="M74 75L147.25 147M220.5 219L147.25 147M147.25 147L220.5 75L74 219" stroke="white" stroke-width="38" />
                                      </svg>
                                    </div>
                             }
                             doc={id}
                             />
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-400 h-[2px] "></div>
                        <div className="content   ql-editor  -translate-x-4">
                          <p>
                            {parse(
                              language == "en"
                                ? data.descriptionEnglish
                                : data.descriptionChinese
                            )}
                          </p>
                        </div>
                        
                        {data.content.map((data, i) => {
                          return (
                            <>
                              <div className="bg-gray-400 h-[2px]  "></div>
                              <div className="w-100px flex">
                                <div className="bg-[#153045]  py-1 flex items-center">
                                  <h2 className="mx-5 text-xl text-center font-semibold text-white">
                                    {language == "en"
                                      ? data.topicIng
                                      : data.topicChi}
                                  </h2>
                                </div>
                              </div>
                              <div className="py-5 content ql-editor  -translate-x-4">
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
                                      <div className="pb-5 w-[60%] ">
                                        <img
                                          alt="error"
                                          className="w-full "
                                          src={data.img}
                                        ></img>
                                      </div>
                                    );
                                  })}
                                </>
                              }
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </>
          );
        })}
      </div>
      <CustomFooter />
    </>
  );
}

export default Event;

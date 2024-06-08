"use client";

import SolidBackground from "@/components/BreadcrumbArticle";
import CustomFooter from "@/components/CustomFooter";
import BreadcrumbArticle from "@/components/BreadcrumbArticle";
import Image from "next/image";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { useSearchParams } from "next/navigation";
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

function Event() {
  const { language, changeLanguage } = useLanguage();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dataEvents, setDataEvents] = useState([]);

  useEffect(() => {
    getDataEventse(id);
  }, [id]);

  async function getDataEventse(idd) {
    try {
      const docRef = doc(db, "events", idd);
      const querySnapshot = await getDoc(docRef);

      // if (querySnapshot.exists()) {
      //   console.log("Document data:", querySnapshot.data());
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setDataEvents(data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <NavbarWithCTAButton />
      <div className="bg-gray-200 pt-24 pb-5 ps-5 pe-5">
        {dataEvents.map((data, i) => {
          const timestamp = data.createdAt.toDate();

          // Format tanggal
          const formattedDate = format(timestamp, "yyyy-MM-dd");

          return (
            <>
              <div className="md:flex justify-center items-center ">
                <div></div>
                <div className="md:w-4/6 ">
                  <div className="py-2 flex gap-1 ">
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
                      {language == "en" ? data.titleEnglish : data.titleChinese}
                    </p>
                  </div>
                  <div className="bg-white ">
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
                          <h3 className="mb-3  mt-2">
                            {language == "en" ? " Fee: " : "费用: "}
                            {language == "en" ? data.feeRupiah : data.feeYuan}
                          </h3>
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
                                <div className="bg-blue-600 py-1 flex items-center">
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

"use client";
import { useState, useEffect } from "react";
import SolidBackground from "@/components/BreadcrumbArticle";
import CustomFooter from "@/components/CustomFooter";
import BreadcrumbArticle from "@/components/BreadcrumbArticle";
import Image from "next/image";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { useSearchParams } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/page";
import parser from "html-react-parser";
import { useLanguage } from "@/context/LanguageContext";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";
function Article() {
  const { language, changeLanguage } = useLanguage();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dataArticle, setDataArticle] = useState([]);
  useEffect(() => {
    getDataArticles(id);
  }, [id]);

  async function getDataArticles(idd) {
    try {
      const docRef = doc(db, "articles", idd);
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setDataArticle(data);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <NavbarWithCTAButton />
      <div className="bg-gray-200 pt-24 pb-5 ps-5 pe-5">
        {dataArticle.map((data, i) => {
          const timestamp = data.createdAt.toDate();

          // Format tanggal
          const formattedDate = format(timestamp, "yyyy-MM-dd");

          return (
            <>
              <div className="md:flex justify-center items-center ">
                <div></div>
                <div className="md:w-4/6">
                  <div className="py-2 flex gap-1">
                    <a href="/articles">
                      {language == "en" ? "Articles" : "文章"}
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
                    <div className="relative p-5 pb-0">
                      <div className="w-full h-1000px">
                        <h3>{language == "en" ? data.date : formattedDate}</h3>
                        <h1 className="md:text-4xl sm:text-2xl text-xl text-center p-5 font-semibold">
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
                        <div className=" pt-10 pb-10 ql-editor  -translate-x-4">
                          <p>
                            {parser(
                              language == "en"
                                ? data.descriptionEnglish
                                : data.descriptionChinese
                            )}
                          </p>
                        </div>
                        {dataArticle[0].content.map((data, i) => {
                          return (
                            <>
                              <div className="bg-gray-400 h-[2px]   "></div>
                              <div className="w-100px flex items-center justify-center">
                                <div className="bg-blue-600 py-1 px-2 flex justify-center items-center">
                                  <h2 className="mx-5 text-xl text-center font-semibold text-white ">
                                    {language == "en"
                                      ? data.topicIng
                                      : data.topicChi}
                                  </h2>
                                </div>
                              </div>

                              <div className="py-5 ql-editor  -translate-x-4">
                                {parser(
                                  language == "en"
                                    ? data.contentIng
                                    : data.contentChi
                                )}
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

export default Article;

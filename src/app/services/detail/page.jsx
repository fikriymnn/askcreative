"use client";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  getDoc,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import parse from "html-react-parser";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { format } from "date-fns";

import { db, storage } from "../../../../firebase/page";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import { Label, Radio } from "flowbite-react";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { useLanguage } from "@/context/LanguageContext";
import "react-quill/dist/quill.snow.css";
import { data } from "autoprefixer";

function DetailServices() {
  const { language, changeLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dataService, setDataService] = useState([]);
  const [currency, setCurrency] = useState(1);
  const [firsIndex, setFirsIndex] = useState([]);
  const [firsIndexRp, setFirsIndexRp] = useState([]);
  const [lastIndex, setLastIndex] = useState([]);
  const [lastIndexRp, setLastIndexRp] = useState([]);

  const [Index, setIndex] = useState();

  useEffect(() => {
    getDataService(id);
  }, [id]);

  async function getDataService(idd) {
    try {
      const docRef = doc(db, "service", idd);
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setDataService(data);
      setFirsIndexRp(data[0].price[0].priceRupiah);
      setFirsIndex(data[0].price[0].priceYuan);
      const le = data[0].price;

      setLastIndex(le[le.length - 1].priceYuan);
      setLastIndexRp(le[le.length - 1].priceRupiah);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <NavbarWithCTAButton />
      {dataService.map((data, i) => {
        const timestamp = data.createdAt.toDate();
        let servicech = "";
        if (data.service == "Basic Establishment Services") {
          servicech = "基础服务";
        } else if (data.service == "Product Certifications") {
          servicech = "产品认证";
        } else if (data.service == "Finance Accounting Tax") {
          servicech = "财税会计服务";
        } else if (data.service == "Talent Recruitment HR") {
          servicech = "人才招聘和人事";
        } else if (data.service == "Legal Services") {
          servicech = "法律服务";
        }

        let subServicech = "";
        if (data.subService == "Company Registration") {
          subServicech = "公司注册";
        } else if (data.subService == "Visa Registration") {
          subServicech = "签证办理";
        } else if (data.subService == "Trademark") {
          subServicech = "商标";
        } else if (data.subService == "Office Administration") {
          subServicech = "行政办公";
        } else if (data.subService == "Construction Certifications") {
          subServicech = "建筑工程";
        } else if (data.subService == "Factory Licenses") {
          subServicech = "工厂许可";
        } else if (data.subService == "BPOM Food and Drug") {
          subServicech = "BPOM 食药化妆";
        } else if (data.subService == "ISO Management System") {
          subServicech = "ISO 管理体系";
        } else if (data.subService == "SNI National Standard") {
          subServicech = "SNI 国家标准";
        } else if (data.subService == "Medical and Hygiene") {
          subServicech = "医疗卫生 PKRT";
        } else if (data.subService == "POSTEL Telecommunication") {
          subServicech = "POSTEL 电通信";
        } else if (data.subService == "Alcohol and Cigarette") {
          subServicech = "酒和烟证";
        } else if (data.subService == "Other Certification") {
          subServicech = "其他证";
        } else if (data.subService == "Finance Services") {
          subServicech = "财务服务";
        } else if (data.subService == "Accounting Services") {
          subServicech = "会计服务";
        } else if (data.subService == "Tax Services") {
          subServicech = "税务服务";
        } else if (data.subService == "Translator Assistant") {
          subServicech = "翻译助理";
        } else if (data.subService == "Finance Accounting Tax") {
          subServicech = "财税会计";
        } else if (data.subService == "Marketing Sales") {
          subServicech = "销售和营销";
        } else if (data.subService == "Management Candidate") {
          subServicech = "管理人选";
        } else if (data.subService == "HR Management Service") {
          subServicech = "人事管理服务";
        } else if (data.subService == "Legal Administration") {
          subServicech = "法律行政";
        }

        const formattedDate = format(timestamp, "yyyy-MM-dd");

        return (
          <>
            <div key={i} className="bg-gray-200 pt-28 pb-5 ps-5 pe-5 q">
              <div className="flex pb-5 gap-1">
                <a
                  href="/services/basicEstablish?comp=0"
                  onClick={() => console.log(lastIndex)}
                >
                  {language == "en" ? "Services" : "服务"}
                </a>
                <p>&gt;</p>
                <p className="text-blue-600">
                  {language == "en" ? data.titleEnglish : data.titleChinese}
                </p>
              </div>
              <div className="bg-white">
                <div className="relative px-5 pt-5 ">
                  <p> {language == "en" ? data.date : formattedDate}</p>
                  <div className="flex gap-1 mb-2 md:text-base sm:text-sm text-xs">
                    <p>{language == "en" ? data.service : servicech} </p>
                    <p>&gt;</p>
                    <p> {language == "en" ? data.subService : subServicech}</p>
                  </div>

                  <div className="md:flex sm:grid sm:grid-cols-1 grid grid-cols-1 mb-3">
                    <div
                      className="bg-gray-100 md:w-[500px] md:h-[300px]  mt-2 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${data.img})`,
                      }}
                    ></div>
                    <div className="md:ps-4 ps-">
                      <p className="md:text-2xl text-2xl pb-4">
                        {language == "en"
                          ? data.titleEnglish
                          : data.titleChinese}
                      </p>
                      <div className="flex pb-6 gap-1 ">
                        {currency == 1 ? (
                          <p className="md:text-2xl sm:text2xl text-xl">RP. </p>
                        ) : (
                          ""
                        )}
                        <p className="text-blue-600 md:text-2xl sm:text2xl text-xl">
                          {currency == 1
                            ? Index == null
                              ? `${firsIndexRp} - ${lastIndexRp}`
                              : data.price[Index].priceRupiah
                            : Index == null
                              ? `${firsIndex} - ${lastIndex}`
                              : data.price[Index].priceYuan}
                        </p>
                        {currency == 2 ? (
                          <p className="md:text-2xl sm:text2xl text-xl">元</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <p className="pb-4">
                        {language == "en" ? "Options Currency:" : "选项"}
                      </p>
                      <fieldset className="flex gap-3 pb-4" id="radio">
                        <>
                          <div className="flex items-center gap-2   border-gray-200  border p-3">
                            <Radio
                              id="rupiah"
                              name="currency"
                              value="1"
                              checked={currency === parseInt("1", 10)}
                              onChange={() => setCurrency(1)}
                            />
                            <Label htmlFor="rupiah">Rupiah</Label>
                          </div>
                          <div className="flex items-center gap-2   border-gray-200  border p-3">
                            <Radio
                              id="Yuan"
                              name="currency"
                              value="Yuan"
                              onChange={() => setCurrency(2)}
                            />
                            <Label htmlFor="Yuan">Yuan</Label>
                          </div>
                        </>
                      </fieldset>
                      <p className="pb-4">
                        {language == "en" ? "Options:" : "选项"}
                      </p>
                      <fieldset className="flex gap-3 pb-4" id="radio">
                        {data.price.map((data, i) => {
                          return (
                            <>
                              <div className="flex items-center gap-2   border-gray-200  border p-3">
                                <Radio
                                  key={i}
                                  id={data.option}
                                  name="countries"
                                  value={data.option}
                                  onChange={() => setIndex(i)}
                                />
                                <Label htmlFor={data.option}>
                                  {data.option}
                                </Label>
                              </div>
                            </>
                          );
                        })}
                      </fieldset>
                    </div>
                  </div>
                  <div className="content pb-3 ql-editor  -translate-x-4">
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
                        <div className="h-[2px] w-full bg-gray-300 "></div>
                        <div className="flex">
                          <div className=" bg-blue-600">
                            <p className="text-center text-white text-base font-semibold p-3">
                              {language == "en" ? data.topicIng : data.topicChi}
                            </p>
                          </div>
                          <div></div>
                        </div>
                        <div className=" pb-10 ql-editor -translate-x-4">
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
          </>
        );
      })}

      <CustomFooter />
    </>
  );
}

export default DetailServices;

"use client";
import React from "react";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import { Label, Radio } from "flowbite-react";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CompanyRegistrationCard from "@/components/CompanyRegistrationCard";
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
import "react-quill/dist/quill.snow.css";

import { db } from "../../../../firebase/page";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import { useLanguage } from "@/context/LanguageContext";

function DetailPackages() {
  const searchParams = useSearchParams();
  const { language, changeLanguage } = useLanguage();

  const [dataPackage, setDataPackage] = useState([]);
  const [Index, setIndex] = useState();
  const [currency, setCurrency] = useState(1);
  const id = searchParams.get("id");
  const [firsIndex, setFirsIndex] = useState([]);
  const [firsIndexRp, setFirsIndexRp] = useState([]);
  const [lastIndex, setLastIndex] = useState([]);
  const [lastIndexRp, setLastIndexRp] = useState([]);

  useEffect(() => {
    getDataPackage(id);
  }, [id]);

  //get data about
  async function getDataPackage(idd) {
    try {
      const docRef = doc(db, "package", idd);
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

      setDataPackage(data);
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
      {dataPackage.map((data, i) => {
        return (
          <>
            <div className="bg-gray-200 pt-24 pb-5 ps-5 pe-5">
              <div className="flex pb-5 gap-1">
                <p>Packages </p> <p>&gt;</p>
                <p className="text-blue-600">
                  {data.titleChinese} {data.titleEnglish}
                </p>
              </div>
              <div className="bg-white">
                <div className="relative px-5 pt-5">
                  <div className="md:flex sm:grid sm:grid-cols-1 grid grid-cols-1 mb-5">
                    <div
                      className="bg-gray-100 md:w-[500px] md:h-[300px]  mt-2 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${data.img})`,
                      }}
                    ></div>
                    <div className="md:ps-5 ps-">
                      <p className="md:text-2xl text-2xl pb-4">
                        {data.titleChinese} {data.titleEnglish}
                      </p>
                      <div className="flex gap-1 pb-6">
                        {currency == 1 ? <p className="text-2xl">RP. </p> : ""}
                        <p className="text-blue-600 text-2xl">
                          {currency == 1
                            ? Index == null
                              ? `${firsIndexRp} - ${lastIndexRp}`
                              : data.price[Index].priceRupiah
                            : Index == null
                              ? `${firsIndex} - ${lastIndex}`
                              : data.price[Index].priceYuan}
                        </p>
                        {currency == 2 ? <p className="text-2xl"> 元</p> : ""}
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
                  <div className="text-2xl font-medium">
                    <p> {language == "en" ? "Services: " : "服务: "}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 pb-5 pt-2 scale-95 gap-5">
                    {data.services.map((data, i, arr) => {
                      const le = data;
                      const firsPriceRp = data.price[0].priceRupiah;
                      const lastPriceRp =
                        data.price[data.price.length - 1].priceRupiah;
                      const firsPriceYuan = data.price[0].priceYuan;
                      const lastPriceYuan =
                        data.price[data.price.length - 1].priceYuan;
                      return (
                        <>
                          <div className=" md:flex ">
                            <div className="md:w-64 pt-3 " key={i}>
                              <a href={`/services/detail?id=${data.id}`}>
                                <div className="bg-white shadow-xl md:hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2  ">
                                  <div
                                    className=" h-48 bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url(${data.img})`,
                                    }}
                                  ></div>
                                  <div className="p-3 md:w-full sm:w-full w-11/12 md:h-32 flex-col flex justify-between">
                                    <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 md:line-clamp-3 line-clamp-3 ">
                                      {language == "en"
                                        ? data.nameIng
                                        : data.nameChi}
                                    </h1>
                                    <h2 className="md:text-sm sm:text-sm text-sm text-blue-600 line-clamp-1 ">
                                      {currency == 1
                                        ? "RP. " +
                                        firsPriceRp +
                                        "-" +
                                        lastPriceRp
                                        : firsPriceYuan +
                                        "-" +
                                        lastPriceYuan +
                                        "元"}
                                    </h2>
                                  </div>
                                </div>
                              </a>
                            </div>
                            {/* {i < arr.length - 1 && (
                              <div className=" flex items-center justify-center w-10 mx-auto  text-center m-2 ">
                                <span className="text-5xl font-bold">+</span>
                              </div>
                            )} */}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="h-[2px] w-full bg-gray-300 mt-5 "></div>
                  <div className=" ql-editor pb-0 mb-0 -translate-x-4">
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
                        <div className=" flex ">
                          <p className="bg-blue-600 text-white text-base font-semibold py-2 px-4">
                            {language == "en" ? data.topicIng : data.topicChi}
                          </p>
                          <div className=""></div>
                        </div>
                        <div className="ql-editor -translate-x-4">
                          {parse(
                            language == "en" ? data.contentIng : data.contentChi
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
          </>
        );
      })}

      <CustomFooter />
    </>
  );
}

export default DetailPackages;

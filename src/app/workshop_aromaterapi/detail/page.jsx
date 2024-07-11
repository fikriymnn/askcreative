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
import Navbar from "@/components/newcomps/navbar";

function DetailAromaterapi() {
  const searchParams = useSearchParams();
  const { language, changeLanguage } = useLanguage();
  const [search, setSearch] = useState("");

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
      const docRef = doc(db, "aromaterapi_workshop", idd);
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
      <Navbar />
      {dataPackage.map((data, i) => {
        return (
          <>
            <div className="bg-gray-200 pt-44 pb-5 ps-5 pe-5 flex flex-col items-center">
              <div className="flex pb-5 gap-1 w-10/12 justify-start">
                <p>Aromaterapi</p> <p>&gt;</p>
                <p className="text-blue-600">
                  {data.title}
                </p>
              </div>
              <div className="bg-white w-10/12">
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
                        {data.title}
                      </p>
                      <div className="flex gap-1 pb-6">
                        {data.description}sss
                      </div>



                    </div>
                  </div>
                  <div className="text-2xl font-medium">
                    <p> {language == "en" ? "Kegiatan: " : "Kegiatan: "}</p>
                  </div>

                  {/* ======== */}
                  <div className="flex flex-wrap pb-5 pt-2 scale-95 gap-5">

                    <div key={i} className="rounded-md">
                      <a href={`/events/event?id=${data.id}`}>
                        <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out grid grid-cols-2 md:flex md:flex-col h-full ">
                          <div
                            className="bg-blue-700 md:mb-5 md:rounded-t-3xl rounded-s-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: `url(${data.img})` }}
                          >
                            <Image alt="" src={data.img} width={100} height={100} className="w-full h-full md:rounded-t-3xl rounded-s-3xl" />

                          </div>

                          <div className="px-3 pb-3 flex flex-col justify-between ">
                            <p className="lg:text-base md:text-xs sm:text-sm text-xs h-12 font-semibold text-black line-clamp-2  ">

                              {data.titleEnglish}ksdjlfdfjlksfnkl

                            </p>
                            <div>
                              <div className="lg:flex text-[11px] lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
                                <div className="lg:mt-2">
                                  {language == "en"
                                    ? data.durationFrom
                                    : data.durationFromValue}{" "}ksdjlfdfjlksfnkl
                                </div>
                                <p className="lg:text-base md:text-xs sm:text-sm text-xs translate-y-[1px] md:translate-y-[4px]">
                                  &#8226;
                                </p>
                                <div className="lg:mt-2">{data.timeFrom}ksdjlfdfjlksfnkl</div>
                              </div>
                              <h2 className="text-gray-500 lg:text-base md:text-xs sm:text-sm text-xs">
                                {data.location}ksdjlfdfjlksfnkl
                              </h2>
                              <div className=" w-full justify-between">
                                <h2 className="font-medium text-gray-800 lg:text-base md:text-xs sm:text-sm text-xs">
                                  {
                                    data.feeRupiahksdjlfdfjlksfnkl
                                  }
                                </h2>
                                <h2 className="lg:text-base md:text-xs sm:text-sm text-xs">Kuota Tersedia : {data.quota}</h2>

                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>




                  </div>
                  
                
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

export default DetailAromaterapi;

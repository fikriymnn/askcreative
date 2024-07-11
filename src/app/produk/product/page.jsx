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
import Navbar from "@/components/newcomps/navbar";
function ProdukDetail() {
  const { language, changeLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dataProduk, setDataProduk] = useState([]);
  useEffect(() => {
    getDataProduks(id);
  }, [id]);

  async function getDataProduks(idd) {
    try {
      const docRef = doc(db, "produk", idd);
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setDataProduk(data);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 pt-44 pb-5 ps-5 pe-5">
        {dataProduk.map((data, i) => {
         
          return (
            <>
              <div className="md:flex justify-center items-center ">
                <div></div>
                <div className="md:w-5/6">
                  <div className="py-2 flex gap-1">
                    <a href="/produk">
                      {language == "en" ? "produk" : "文章"}
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
                      {data.title}
                    </p>
                  </div>
                  <div className="bg-white ">
                    <div className="relative p-5 pb-0">
                      <div className="w-full h-1000px">
                        
                        
                        <h1 className="md:text-4xl sm:text-2xl text-xl text-center p-5 font-semibold">
                          {
                            data.title}
                        </h1>
                        <div className="flex gap-10  py-10 px-5">
                          <Image
                            src={data.img}
                            width={500}
                            height={10}
                            alt=""
                          />
                        <div className=" pt-10 pb-10 ql-editor  -translate-x-4">
<div className="mb-10">

                              <p><span className="font-semibold">Harga:</span> {data.price}</p>
                              <p><span className="font-semibold">Kategori:</span> {data.kategori}</p>
</div>
                          <p>
                            {parser(

                              data.desc

                            )}
                          </p>
                        </div>
                        </div>
                        
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

export default ProdukDetail;

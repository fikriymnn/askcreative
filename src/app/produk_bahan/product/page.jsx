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
      const docRef = doc(db, "produk_bahan", idd);
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
                      {language == "en" ? "produk bahan" : "文章"}
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
                    <div className=" p-5 pb-0">
                      <div className="w-full h-full">
                        
                        
                        
                        <div className="flex gap-10  py-10 px-5">
                          <Image
                            src={data.img}
                            width={500}
                            height={10}
                            alt=""
                          />
                        <div className=" pt-10 pb-10 ql-editor  -translate-x-4">
<div className="mb-10">
<h1 className="md:text-4xl sm:text-2xl text-xl  font-semibold">
                          {
                            data.title}
                        </h1>
                              <div className=" pt-3 pb-5">
                              <p className="text-slate-600 mt-10 text-lg"><span className="font-semibold  ">Harga:</span> {data.price}</p>
<div className="flex gap-5 pt-2">

                              <button className="bg-orange-500 p-2 rounded-md text-white"> Link to Shopee</button>
                              <button className="bg-green-500 p-2 rounded-md text-white"> Link to Tokopedia</button>
</div>
                              </div>
                              <p className="border-y-2 pt-10 w-full"><span className="font-semibold">Kategori:</span> {data.kategori}</p>
</div>
                         
                        </div>
                        
                      </div>
                  
                          <div className="w-full  text-black flex flex-col gap-1 px-5  h-full pb-10">
                            <h1 className="text-lg font-semibold">Deskripsi</h1>
                            <hr />
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

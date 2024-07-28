"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ProdukLabtoolCard from "@/components/ProdukLabtoolCard";
import CustomFooter from "@/components/CustomFooter";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { format } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "../newcomps/navbar";

function ProdukLabtoolpage({ dataProduk }) {
  const { language, changeLanguage } = useLanguage();

  const [filteredProduk, setFilteredProduk] = useState(dataProduk);
  const [displayedProduk, setDisplayedProduk] = useState([]);
  const [search, setSearch] = useState("");
  const postsPerPage = 10;
  const ref = useRef(postsPerPage);

  const handleSearch = (e) => {
    setSearch(e);
    const results = dataProduk.filter((item) =>
      language === "en"
        ? item.title.toLowerCase().includes(e.toLowerCase())
        : ""
    );
    setFilteredProduk(results);
    setDisplayedProduk(results.slice(0, postsPerPage));
    ref.current = postsPerPage;
  };

  const handleShowMorePosts = () => {
    const newPosts = filteredProduk.slice(ref.current, ref.current + postsPerPage);
    setDisplayedProduk((prev) => [...prev, ...newPosts]);
    ref.current += postsPerPage;
  };

  useEffect(() => {
    setFilteredProduk(dataProduk);
    setDisplayedProduk(dataProduk.slice(0, postsPerPage));
  }, [dataProduk]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 pt-24 pb-5 ps-5 pe-5 min-h-[700px]">
        <div className="bg-white rounded-ss-[100px]">
          <div className="md:flex justify-between md:mb-5 mb-10 px-10  z-10  pt-8   mt-20 mx-5">
            <h1 className="text-[#0E2233] text-3xl font-bold md:mb-0 mb-5 md:mx-0 -mx-5">Alat Labolatorium Skala Mikro</h1>
            <div className="relative z-10 -mx-5">
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by title..."
                className="w-12/12 z-10 h-12 pl-4 pr-10 rounded-md border-none bg-gray-200 focus:outline-none !important"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 13.293a6 6 0 111.414-1.414l5 5a1 1 0 01-1.414 1.414l-5-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 16a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 px-5 pb-5">
            {displayedProduk.map((data, i) => (
              <ProdukLabtoolCard
                key={i}
                price={data.price}
                id={data.id}
                img={data.img}
                kategori={data.kategori}
                title={data.title}
              />
            ))}
          </div>
          {ref.current < filteredProduk.length && (
            <div className="flex justify-center pb-5">
              <button onClick={handleShowMorePosts} className=" px-2 py-1 bg-green-900 text-white rounded-md">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
      <CustomFooter />
    </>
  );
}

export default ProdukLabtoolpage;

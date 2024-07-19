"use client";
import React, { useEffect, useState, useRef } from "react";
import ProdukBahanCard from "@/components/ProdukBahanCard";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "../newcomps/navbar";
import { useLanguage } from "@/context/LanguageContext";

function ProdukBahanPage({ dataProduk }) {
  const { language } = useLanguage();
  const [filteredProduk, setFilteredProduk] = useState(dataProduk);
  const [displayedProduk, setDisplayedProduk] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const postsPerPage = 10;
  const ref = useRef(postsPerPage);

  const handleSearch = (e) => {
    setSearch(e);
    const results = dataProduk.filter((item) =>
      language === "en"
        ? item.title.toLowerCase().includes(e.toLowerCase())
        : ""
    );
    const filteredResults = results.filter((item) =>
      selectedCategory === "All" ? true : item.kategori === selectedCategory
    );
    setFilteredProduk(filteredResults);
    setDisplayedProduk(filteredResults.slice(0, postsPerPage));
    ref.current = postsPerPage;
  };

  const handleShowMorePosts = () => {
    const newPosts = filteredProduk.slice(ref.current, ref.current + postsPerPage);
    setDisplayedProduk((prev) => [...prev, ...newPosts]);
    ref.current += postsPerPage;
  };

  useEffect(() => {
    const initialFiltered =
      selectedCategory === "All"
        ? dataProduk
        : dataProduk.filter((item) => item.kategori === selectedCategory);
    setFilteredProduk(initialFiltered);
    setDisplayedProduk(initialFiltered.slice(0, postsPerPage));
  }, [dataProduk, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filteredResults =
      category === "All"
        ? dataProduk
        : dataProduk.filter((item) => item.kategori === category);
    setFilteredProduk(filteredResults);
    setDisplayedProduk(filteredResults.slice(0, postsPerPage));
    ref.current = postsPerPage;
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 pt-24 pb-5 ps-5 pe-5 min-h-[700px]">
        <div className="bg-white rounded-ss-[100px]">
          <div className="flex justify-between z-10 p-5 pt-8 px-10 mt-20 mx-5">
            <h1 className="text-[#0E2233] text-3xl font-bold">Bahan Parfum dan Aromaterapi</h1>
            <div className="relative z-10">
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
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-md ${selectedCategory === "All" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange("parfum")}
              className={`px-4 py-2 rounded-md ${selectedCategory === "parfum" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
             Parfum
            </button>
            <button
              onClick={() => handleCategoryChange("aromaterapi")}
              className={`px-4 py-2 rounded-md ${selectedCategory === "aromaterapi" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Aromaterapi
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 px-5 pb-5">
            {displayedProduk.length > 0 ? (
              displayedProduk.map((data, i) => (
                <ProdukBahanCard
                  key={i}
                  price={data.price}
                  id={data.id}
                  img={data.img}
                  kategori={data.kategori}
                  title={data.title}
                />
              ))
            ) : (
              <div className="col-span-5 text-center text-gray-500">
                Tidak ada produk dalam kategori ini.
              </div>
            )}
          </div>
          {ref.current < filteredProduk.length && (
            <div className="flex justify-center pb-5">
              <button onClick={handleShowMorePosts} className="px-2 py-1 bg-green-900 text-white rounded-md">
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

export default ProdukBahanPage;

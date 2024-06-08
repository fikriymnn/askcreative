"use client";
import React from "react";
import { useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/page";
import Navigation from "@/components/admin/navigation";

import Image from "next/image";
function ServicesAdminPage({ data }) {
  const dataService = data;
  const [dataServicesResult, setDataServiceResult] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e);
    const results = dataService.filter(
      (item) => item.titleEnglish.toLowerCase().includes(search.toLowerCase())
      // : item.titleChinese.toLowerCase().includes(search.toLowerCase())
    );
    setDataServiceResult(results);
  };

  return (
    <>
      <div className="flex">
        <Navigation services="ps-3 text-[#0d3064] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll">
          <div className="w-full bg-[#0d3064] ">
            <p className="pt-5 text-center font-bold text-3xl text-white">
              Services
            </p>
            <div className="p-5">
              <div className="flex py-5">
                <a
                  className="bg-blue-500 py-3 px-5 rounded-md text-white font-bold"
                  href="/dashboardAdmin/services/create"
                >
                  <button
                  //onClick={openAddService}
                  >
                    Add New Service
                  </button>
                </a>
              </div>
              <div className="relative py-5 pt-10">
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full h-12 pl-4 pr-10 rounded-md border-none bg-gray-200 focus:outline-none !important"
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
              <div className="grid grid-cols-1 gap-5">
                <div className="flex bg-slate-300 rounded-md  font-semibold">
                  <div className="p-2 h-full w-[50px] ">No</div>
                  <div className="p-2 h-full w-[225px] border-s-2">
                    <p>Image</p>
                  </div>
                  <div className="w-full flex">
                    <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                      <p>Title</p>
                    </div>
                    <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                      <p>Price</p>
                    </div>
                    <div className="w-[250px] border-x-2  flex justify-start items-center p-2">
                      <p>Category</p>
                    </div>
                  </div>
                  <div className="w-[230px]  flex gap-3 mx-3 my-auto">
                    <p>Actions</p>
                  </div>
                </div>

                <div className=" h-[450px] overflow-y-auto">
                  {search == ""
                    ? dataService.map((data, i) => {
                        return (
                          <>
                            <div className="flex bg-slate-300 rounded-md mb-3">
                              <div className="p-2 h-full w-[50px] flex justify-start items-center ">
                                <p>{i + 1}</p>
                              </div>
                              <div className="p-2 h-full w-[209px] border-s-2">
                                <Image
                                  width={100}
                                  height={100}
                                  src={data.img}
                                  alt=""
                                />
                              </div>
                              <div className="w-full flex">
                                <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.titleEnglish}</p>
                                    <p>{data.titleChinese}</p>
                                  </div>
                                </div>
                                <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.price[0].priceYuan} 元</p>
                                  </div>
                                </div>
                                <div className="w-[250px] border-x-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.service}</p>
                                    <p className="text-blue-600">
                                      {data.subService}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-32  flex gap-3 m-3 my-auto justify-center items-center">
                                <a
                                  className="bg-yellow-400  rounded-md p-2"
                                  href={`/dashboardAdmin/services/edit?id=${data.id}`}
                                >
                                  <Image
                                    width={35}
                                    height={35}
                                    src="/assets/images/edit-svgrepo-com.svg"
                                    alt=""
                                  />
                                </a>
                                <button
                                  onClick={async (e) => {
                                    try {
                                      // Delete the todo document with the given ID from the "todos" collection in Firestore.
                                      await deleteDoc(
                                        doc(db, "service", data.id)
                                      );
                                      alert("delete success");
                                      location.reload();
                                      console.log("Deleted successfully");
                                    } catch (error) {
                                      console.error("An error occured", error);
                                    }
                                  }}
                                  className="bg-red-600  rounded-md p-2"
                                >
                                  <Image
                                    width={35}
                                    height={35}
                                    src="/assets/images/delete-1-svgrepo-com.svg"
                                    alt=""
                                  />
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : dataServicesResult.map((data, i) => {
                        return (
                          <>
                            <div className="flex bg-slate-300 rounded-md mb-3">
                              <div className="p-2 h-full w-[50px] flex justify-start items-center ">
                                <p>{i + 1}</p>
                              </div>
                              <div className="p-2 h-full w-[209px] border-s-2">
                                <Image
                                  width={100}
                                  height={100}
                                  src={data.img}
                                  alt=""
                                />
                              </div>
                              <div className="w-full flex">
                                <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.titleEnglish}</p>
                                    <p>{data.titleChinese}</p>
                                  </div>
                                </div>
                                <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.price[0].priceYuan} 元</p>
                                  </div>
                                </div>
                                <div className="w-[250px] border-x-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.service}</p>
                                    <p className="text-blue-600">
                                      {data.subService}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-32  flex gap-3 m-3 my-auto justify-center items-center">
                                <a
                                  className="bg-yellow-400  rounded-md p-2"
                                  href={`/dashboardAdmin/services/edit?id=${data.id}`}
                                >
                                  <Image
                                    width={35}
                                    height={35}
                                    src="/assets/images/edit-svgrepo-com.svg"
                                    alt=""
                                  />
                                </a>
                                <button
                                  onClick={async (e) => {
                                    const confirmed = window.confirm(
                                      "Are you sure you want to delete this item?"
                                    );
                                    if (confirmed) {
                                      try {
                                        // Delete the todo document with the given ID from the "todos" collection in Firestore.
                                        await deleteDoc(
                                          doc(db, "service", data.id)
                                        );
                                        alert("delete success");
                                        location.reload();
                                        console.log("Deleted successfully");
                                      } catch (error) {
                                        alert(error.message);
                                      }
                                    }
                                  }}
                                  className="bg-red-600  rounded-md p-2"
                                >
                                  <Image
                                    width={35}
                                    height={35}
                                    src="/assets/images/delete-1-svgrepo-com.svg"
                                    alt=""
                                  />
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesAdminPage;

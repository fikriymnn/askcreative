"use client";
import React from "react";

import { useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/page";
import parse from "html-react-parser";
import Navigation from "@/components/admin/navigation";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  
  orderBy,
  updateDoc,
 
  Firestore,
} from "firebase/firestore";
import Image from "next/image";
import "@/components/admin/editor.css";
function LabtoolPage({ data }) {
 const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    getDataProduct();
  }, []);

  //get data about
  const getDataProduct = async () => {
    try {
      try {
        const querySnapshot = await getDocs(collection(db, "produk_labtool"));
        let data = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        setDataProduct(data);
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="flex">
        <Navigation catalogue="ps-3 text-[#184737] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll">
          <div className="w-full bg-[#184737] ">
            <p className="pt-5 text-center font-bold text-3xl text-white">
              Add Catalogue
            </p>
            <div className="p-5 w-full">
              <div className="flex justify-between py-5">
                <a
                  className="bg-blue-500 py-3 px-5 rounded-md text-white font-bold"
                  href="/dashboardAdmin/catalogue/labtool/add"
                >
                  <button
                  //onClick={openAddService}
                  >
                    Add New Product
                  </button>
                </a>
                <a
                  className="bg-blue-500 py-3 px-5 rounded-md text-white font-bold"
                  href="/dashboardAdmin/catalogue/"
                >
                  <button
                  //onClick={openAddService}
                  >
                    Back
                  </button>
                </a>
              </div>
             
              <div className="grid grid-cols-1 gap-5 w-full">
                <div className="flex bg-slate-300 rounded-md  font-semibold">
                  <div className="p-2 h-full w-[50px] ">No</div>
                  <div className="p-2 h-full w-[225px] border-s-2">
                    <p>Image</p>
                  </div>
                  <div className="w-full flex">
                    <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                      <p>Title</p>
                    </div>
                    <div className="w-[250px] border-s-2  flex justify-start items-center p-2">
                      <p>Category</p>
                    </div>
                    <div className=" border-x-2 w-[200px] flex justify-start items-center p-2">
                      <p>price</p>
                    </div>
                  </div>
                  <div className="w-32  flex gap-3 mx-3 my-auto">
                    <p>Actions</p>
                  </div>
                </div>

                <div className=" h-[450px] overflow-y-auto">
                  {dataProduct.map((data, i) => {
                        return (
                          <>
                            <div className="flex bg-slate-300 rounded-md">
                              <div className="p-2 h-full w-[50px] flex justify-start items-center ">
                                <p>{i + 1}</p>
                              </div>
                              <div className="px-4 py-2 h-full w-[212px] border-s-2">
                                <Image
                                  src={data.img}
                                  alt=""
                                  width={150}
                                  height={150}
                                />
                              </div>
                              <div className="w-full flex ">
                                <div className="w-[200px] border-s-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col">
                                    <p>{data.title}</p>
                                    {/* <p>{data.titleChinese}</p> */}
                                  </div>
                                </div>
                                <div className="w-[250px] border-s-2  flex justify-start items-center p-2">
                                  <div className="flex flex-col content">
                                    <div className="line-clamp-2">
                                      {data.kategori}
                                    </div>
                                    {/* <div className="line-clamp-2">
                                      {parse(data.content[0].contentChi)}
                                    </div> */}
                                  </div>
                                </div>
                                <div className=" border-x-2 w-[200px] flex justify-start items-center p-2">
                                  <p>{data.price}</p>
                                </div>
                              </div>
                              <div className="w-32  flex gap-3 m-3 my-auto">
                               <a
                                className="bg-yellow-400 rounded-md p-2"
                                href={`/dashboardAdmin/catalogue/labtool/edit?id=${data.id}`}
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
                                          doc(db, "produk_labtool", data.id)
                                        );
                                        alert("delete success");
                                        location.reload();
                                        console.log("Deleted successfully");
                                      } catch (error) {
                                        alert(error.message);
                                        console.error(
                                          "An error occured",
                                          error
                                        );
                                      }
                                    }
                                  }}
                                  className="bg-red-600 rounded-md p-2"
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
                            ;
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

export default LabtoolPage;

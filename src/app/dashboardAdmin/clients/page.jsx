"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navigation from "@/components/admin/navigation";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase/page";
import Image from "next/image";

function ClientAdmin() {
  const [dataClient, setDataClient] = useState([]);

  useEffect(() => {
    getDataClient();
  }, []);

  //get data about
  const getDataClient = async () => {
    try {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        let data = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        setDataClient(data);
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
        <Navigation clients="ps-3 text-[#0d3064] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll">
          <div className="w-full bg-[#0d3064] ">
            <p className="pt-5 text-center font-bold text-3xl text-white">
              Customers
            </p>

            <div className="p-5 w-full">
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-7">
                {dataClient.map((data, i) => {
                  return (
                    <>
                      <div key={i} className="border-2 p-2 rounded-md">
                        <div
                          className="h-32 bg-white rounded-md p-2 bg-contain bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${data.img})` }}
                        ></div>
                        <div className=" flex gap-2 pt-2">
                          <a
                            href={`/dashboardAdmin/clients/edit?id=${data.id}`}
                            className="bg-yellow-400 h-10 rounded-md w-3/6 p-3 flex items-center justify-center"
                          >
                            <Image
                              src="/assets/images/edit-svgrepo-com.svg"
                              width={25}
                              height={25}
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
                                  await deleteDoc(doc(db, "clients", data.id));
                                  alert("delete success");
                                  location.reload();
                                } catch (error) {
                                  console.error("An error occured", error);
                                }
                              }
                            }}
                            className="bg-red-600 h-10 rounded-md w-3/6 p-3 flex items-center justify-center"
                          >
                            <Image
                              src="/assets/images/delete-1-svgrepo-com.svg"
                              width={25}
                              height={25}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}

                <a
                  href="/dashboardAdmin/clients/create/"
                  className="flex h-44 justify-center items-center p-2 hover:text-xl hover:p-0 border-2 duration-100 rounded-md"
                >
                  <button className="bg-white rounded-md h-full w-full ">
                    <div className="py-5">
                      <p className="text-5xl text-center">+</p>
                      <p className=" ">Add New Logo</p>
                    </div>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientAdmin;

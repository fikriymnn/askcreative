"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navigation from "@/components/admin/navigation";
import { initializeApp } from "firebase/app";
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

function HomeAdmin() {
  //get data home page
  const [dataHomeHeading, setDataHomeHeading] = useState([]);
  const [dataHomeParagraph, setDataHomeParagraph] = useState([]);
  const [dataLogoWhite, setDataLogoWhite] = useState([]);
  const [dataLogoNav, setDataLogoNav] = useState([]);
  const [dataLogoFoot, setDataLogoFoot] = useState([]);
  useEffect(() => {
    getDataHomeHeading();
    getDataHomeParagraph();
    getDataHomeLogoWhite();
    getDataHomeLogoNav();
    getDataHomeLogoFoot();
  }, []);

  //get data home page
  const getDataHomeHeading = async () => {
    try {
      const docRef = doc(db, "editHomePage", "heading");
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        console.log("Document data:", querySnapshot.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setDataHomeHeading(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataHomeParagraph = async () => {
    try {
      const docRef = doc(db, "editHomePage", "paragraph");
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        console.log("Document data:", querySnapshot.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setDataHomeParagraph(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataHomeLogoWhite = async () => {
    try {
      const docRef = doc(db, "editHomePage", "logoWhite");
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        console.log("Document data:", querySnapshot.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setDataLogoWhite(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataHomeLogoNav = async () => {
    try {
      const docRef = doc(db, "editHomePage", "logoNav");
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        console.log("Document data:", querySnapshot.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setDataLogoNav(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataHomeLogoFoot = async () => {
    try {
      const docRef = doc(db, "editHomePage", "logoFooter");
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        console.log("Document data:", querySnapshot.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setDataLogoFoot(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="flex">
        <Navigation homepage="ps-3 text-[#0d3064] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll">
          <div className="w-full bg-[#0d3064] ">
            <p className="pt-5 text-center font-bold text-3xl text-white ">
              Homepage
            </p>

            <div className="p-5 w-full">
              <div className="grid grid-cols-1 gap-5 w-full">
                <div className="flex bg-slate-300 rounded-md w-full font-semibold">
                  <div className="w-full flex">
                    <div className="w-2/12  flex justify-start items-center p-2">
                      <p>Section</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      <p>Content</p>
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 mx-3 my-auto">
                    <p>Edit</p>
                  </div>
                </div>
                <div className="flex bg-slate-300 rounded-md">
                  <div className="w-full flex">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Heading</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      <div className="flex flex-col">
                        {dataHomeHeading.length > 0 &&
                          dataHomeHeading.map((data, i) => {
                            return (
                              <>
                                <p>{data.english}</p>
                                <p>{data.chinese}</p>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/home/editHeading"
                    >
                      <button>
                        <Image
                          width={35}
                          height={35}
                          className="w-8"
                          src="/assets/images/edit-svgrepo-com.svg"
                          alt=""
                        />
                      </button>
                    </a>
                  </div>
                </div>

                <div className="flex bg-slate-300 rounded-md">
                  <div className="w-full flex">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Paragraph</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      <div className="flex flex-col">
                        {dataHomeParagraph.length > 0 &&
                          dataHomeParagraph.map((data, i) => {
                            return (
                              <>
                                <p>{data.english}</p>
                                <p>{data.chinese}</p>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/home/editParagraph"
                    >
                      <button>
                        <Image
                          width={35}
                          height={35}
                          className="w-8"
                          src="/assets/images/edit-svgrepo-com.svg"
                          alt=""
                        />
                      </button>
                    </a>
                  </div>
                </div>

                <div className="flex bg-slate-300 rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Logo navbar white</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      <div className="flex flex-col">
                        
                      </div>
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/home/editLogoWhite"
                    >
                      <button>
                        <Image
                          width={35}
                          height={35}
                          className="w-8"
                          src="/assets/images/edit-svgrepo-com.svg"
                          alt=""
                        />
                      </button>
                    </a>
                  </div>
                </div>

                <div className="flex bg-slate-300 rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Logo navbar</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      <div className="flex flex-col">
                        {dataLogoNav.length > 0 &&
                          dataLogoNav.map((data, i) => {
                            return <>
                              <Image width={220} height={100} src={data.img} alt="" /></>;
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/home/editLogoNavbar"
                    >
                      <button>
                        <Image
                          width={35}
                          height={35}
                          className="w-8"
                          src="/assets/images/edit-svgrepo-com.svg"
                          alt=""
                        />
                      </button>
                    </a>
                  </div>
                </div>

                <div className="flex bg-slate-300 rounded-md">
                  <div className="w-full h-20 flex">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Logo footer</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      <div className="flex flex-col">
                        {dataLogoFoot.length > 0 &&
                          dataLogoFoot.map((data, i) => {
                            return <><Image width={220} height={100} className="h-14" src={data.img} alt="" /></>;
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/home/editLogoFooter"
                    >
                      <button>
                        <Image
                          width={35}
                          height={35}
                          className="w-8"
                          src="/assets/images/edit-svgrepo-com.svg"
                          alt=""
                        />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;

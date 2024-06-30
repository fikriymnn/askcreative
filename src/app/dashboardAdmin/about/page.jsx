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

function AboutAdmin() {
  //get data about
  const [dataAboutHeading, setDataAboutHeading] = useState([]);
  const [dataAboutParagraph, setDataAboutParagraph] = useState([]);
  const [dataAboutAddress, setDataAboutAddress] = useState([]);
  const [dataAboutPhone, setDataAboutPhone] = useState([]);
  const [dataAboutEmail, setDataAboutEmail] = useState([]);
  const [dataAboutBarcode, setDataAboutBarcode] = useState([]);
  const [dataAboutIg, setDataAboutIg] = useState([]);
  const [dataAboutFacebook, setDataAboutFacebook] = useState([]);
  const [dataAboutWechat, setDataAboutWechat] = useState([]);
  const [dataAboutLinkedin, setDataAboutLinkedin] = useState([]);

  useEffect(() => {
    getDataAboutHeading();
    getDataAboutParagraph();
    getDataAboutAdrress();
    getDataAboutPhone();
    getDataAboutEmail();
    getDataAboutBarcode();
    getDataAboutIg();
    getDataAboutFacebook();
    getDataAboutLinkedin();
    getDataAboutWechat();
  }, []);

  //get data about
  const getDataAboutHeading = async () => {
    try {
      const docRef = doc(db, "editAbout", "heading");
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

      setDataAboutHeading(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutParagraph = async () => {
    try {
      const docRef = doc(db, "editAbout", "paragraph");
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

      setDataAboutParagraph(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutAdrress = async () => {
    try {
      const docRef = doc(db, "editAbout", "address");
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

      setDataAboutAddress(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutPhone = async () => {
    try {
      const docRef = doc(db, "editAbout", "phone");
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

      setDataAboutPhone(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutEmail = async () => {
    try {
      const docRef = doc(db, "editAbout", "email");
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

      setDataAboutEmail(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutBarcode = async () => {
    try {
      const docRef = doc(db, "editAbout", "barcode");
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

      setDataAboutBarcode(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutIg = async () => {
    try {
      const docRef = doc(db, "editAbout", "ig");
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

      setDataAboutIg(data);
    } catch (error) {
      alert(error);
    }
  };

  const getDataAboutFacebook = async () => {
    try {
      const docRef = doc(db, "editAbout", "facebook");
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

      setDataAboutFacebook(data);
    } catch (error) {
      alert(error);
    }
  };
  const getDataAboutWechat = async () => {
    try {
      const docRef = doc(db, "editAbout", "wechat");
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

      setDataAboutWechat(data);
    } catch (error) {
      alert(error);
    }
  };
  const getDataAboutLinkedin = async () => {
    try {
      const docRef = doc(db, "editAbout", "linkedin");
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

      setDataAboutLinkedin(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="flex">
        <Navigation about="ps-3 text-[#184737] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll">
          <div className="w-full bg-[#184737] ">
            <p className="pt-5 text-center font-bold text-3xl text-white">
              About
            </p>
            <div className="w-full p-5">
              <div className="w-full grid grid-cols-1 gap-5">
                <div className=" flex bg-slate-300 rounded-md  font-semibold">
                  <div className="w-full flex">
                    <div className="w-2/12 p-2  flex justify-start items-center ">
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
              
                <div className="flex bg-slate-300 w-full rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Address</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      {dataAboutAddress.length > 0 &&
                        dataAboutAddress.map((data, i) => {
                          return (
                            <>
                              <p>{data.address}</p>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/about/editAddress"
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

                <div className="flex bg-slate-300 w-full rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                      <p>Phone</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      {dataAboutPhone.length > 0 &&
                        dataAboutPhone.map((data, i) => {
                          return (
                            <>
                              <p>{data.no}</p>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/about/editPhone"
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
                <div className="flex bg-slate-300 w-full  rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12  font-semibold flex justify-start items-center p-2">
                      <p>EMail</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      {dataAboutEmail.length > 0 &&
                        dataAboutEmail.map((data, i) => {
                          return (
                            <>
                              <p>{data.email}</p>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/about/editEmail"
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
                <div className="flex bg-slate-300 w-full  rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12  font-semibold flex justify-start items-center p-2">
                      <p>Instagram</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      {dataAboutIg.length > 0 &&
                        dataAboutIg.map((data, i) => {
                          return (
                            <>
                              <a
                                className="hover:text-blue-600"
                                href={`https://www.instagram.com/${data.link}`}
                              >
                                https://www.instagram.com/{data.link}
                              </a>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/about/editInstagram"
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
                <div className="flex bg-slate-300 w-full  rounded-md">
                  <div className="w-full flex h-20">
                    <div className="w-2/12  font-semibold flex justify-start items-center p-2">
                      <p>WhatsApp</p>
                    </div>
                    <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                      {dataAboutFacebook.length > 0 &&
                        dataAboutFacebook.map((data, i) => {
                          return (
                            <>
                              <a
                                className="hover:text-blue-600"
                                href={`https://wa.me/${data.link}`}
                              >
                                {`https://wa.me/${data.link}`}
                              </a>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-14  flex gap-3 m-3 my-auto">
                    <a
                      className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto"
                      href="/dashboardAdmin/about/editFacebook"
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

export default AboutAdmin;

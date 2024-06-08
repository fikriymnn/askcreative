"use client";
import Image from "next/image";

import { Button, Navbar, Dropdown, Item } from "flowbite-react";
import { useRouter } from "next/router";
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
  orderBy,
  limit,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../firebase/page";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function NavbarWithCTAButton({ height }) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const [logo, setLogo] = useState([]);
  const [logoWhite, setLogoWhite] = useState([]);

  const handleChangeLanguage = (newLanguage) => {
    changeLanguage(newLanguage);
    sessionStorage.setItem("language", newLanguage);
    // Cookies.set("language", newLanguage);
  };

  const [navbar, SetNavbar] = useState(true);
  const ChangeBG = () => {
    if (window.scrollY < height) {
      SetNavbar(true);
    } else {
      SetNavbar(false);
    }
  };
  if (typeof window !== "undefined") {
    // browser code
    window.addEventListener("scroll", ChangeBG);
  }

  useEffect(() => {
    getDataHomeLogoNav();
    getDataHomeLogoWhite();
  }, []);

  const getDataHomeLogoWhite = async () => {
    try {
      const docRef = doc(db, "editHomePage", "logoWhite");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setLogoWhite(data[0].img);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataHomeLogoNav = async () => {
    try {
      const docRef = doc(db, "editHomePage", "logoNav");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setLogo(data[0].img);
    } catch (error) {
      console.log(error);
    }
  };
  const DropdownServices = () => {
    return (
      <div className=" bg-white absolute mt-10 shadow-md z-10">
        <a href="/services/basicEstablish?comp=0">
          <div className=" py-3 px-4 hover:bg-blue-500 hover:text-white text-slate-600">
            <p className="">
              {language == "en" ? "Basic Establishment Services" : "基础服务"}
            </p>
          </div>
        </a>
        <a href="/services/productCertifications?comp=0">
          <div className=" py-3 px-4 hover:bg-blue-500 hover:text-white text-slate-600">
            <p className="">
              {language == "en" ? "Product Certification" : "产品认证"}
            </p>
          </div>
        </a>
        <a href="/services/financeAccountingTax?comp=0">
          <div className=" py-3 px-4 hover:bg-blue-500 hover:text-white text-slate-600">
            <p className="">
              {language == "en" ? "Finance Accounting Tax" : "财税会计服务"}
            </p>
          </div>
        </a>
        <a href="/services/TalentRecruitmentHR?comp=0">
          <div className=" py-3 px-4 hover:bg-blue-500 hover:text-white text-slate-600">
            <p className="">
              {language == "en" ? "Talent Recruitment HR" : "人才招聘和人事"}
            </p>
          </div>
        </a>
        <a href="/services/LegalServices?comp=0">
          <div className=" py-3 px-4 hover:bg-blue-500 hover:text-white text-slate-600">
            <p className="">
              {language == "en" ? "Legal Services" : "法律服务"}
            </p>
          </div>
        </a>
      </div>
    );
  };
  return (
    <>
      <Navbar
        className={
          navbar
            ? "bg-[#d9d9d943] fixed w-full md:py-5 sm:py-5 py-2 z-30 shadow-md top-0 "
            : " fixed w-full md:py-5 sm:py-5 py-2 z-30 shadow-md top-0 bg-white"
        }
        fluid
      >
        <Navbar.Brand href="/" className="z-40  opacity-100">
          {navbar ? (
            <img
              src={logoWhite}
              alt="not found image"
              className=" md:w-52 md:h-12 sm:w-36 sm:h-10 w-40 opacity-100"
            />
          ) : (
            <img
              src={logo}
              alt=""
              className=" md:w-52 md:h-12 sm:w-36 sm:h-10 w-40 opacity-100"
            />
          )}
        </Navbar.Brand>
        <div className="flex md:w-72 w-52 md:order-3 gap-1 z-40 ">
          <button onClick={() => handleChangeLanguage("en")}>
            <div className=" my-auto w-auto cursor-pointer flex  gap-2 md:mr-3 ">
              <Image
                src={"/assets/images/united-states.png"}
                width={40}
                alt=""
                height={10}
              />
              <p
                className={
                  navbar
                    ? "text-white text-base my-auto md:opacity-100 opacity-0"
                    : "  text-black my-auto text-base  md:opacity-100 opacity-0 "
                }
              >
                English
              </p>
            </div>
          </button>
          <button onClick={() => handleChangeLanguage("chi")}>
            <div className=" my-auto w-auto cursor-pointer flex  gap-2 md:mr-3 ">
              <Image src={"/assets/images/china.png"} width={40} height={10} />
              <p
                className={
                  navbar
                    ? "text-white text-base my-auto md:opacity-100 opacity-0"
                    : "  text-black my-auto text-base  md:opacity-100 opacity-0 "
                }
              >
                简体中文
              </p>
            </div>
          </button>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className=" md:order-1 z-40  ">
          <div className="my-auto ">
            <Navbar.Link href="/">
              <span
                className={
                  navbar
                    ? "text-white md:text-[16px] "
                    : "  text-black my-auto md:text-[16px]   "
                }
              >
                {language == "en" ? "Home" : "首页"}
              </span>
            </Navbar.Link>
          </div>
          <div className=" my-auto">
            <Navbar.Link href="/about" className="navbar-link">
              <span
                className={
                  navbar
                    ? "text-white md:text-[16px]"
                    : "  text-black my-auto md:text-[16px]  "
                }
              >
                {language == "en" ? "About Us" : "关于我们"}
              </span>
            </Navbar.Link>
          </div>
          <div
            className=" my-auto hover:text-blue-500"
            onClick={() => setOpen2(!open2)}
          >
            <Navbar.Link href="#" className=" flex gap-1">
              <span
                className={
                  navbar
                    ? "text-white md:text-[16px]"
                    : "  text-black my-auto md:text-[16px]  "
                }
              >
                {language == "en" ? "Services" : "服务"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  navbar
                    ? "text-white w-4 h-4 my-auto "
                    : " text-slate-700 w-4 h-4 my-auto "
                }
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M112 184l144 144 144-144"
                />
              </svg>
              {open2 && <DropdownServices />}
            </Navbar.Link>
          </div>
          <div className=" my-auto">
            <Navbar.Link href="/articles">
              <span
                className={
                  navbar
                    ? "text-white md:text-[16px]"
                    : "  text-black my-auto md:text-[16px]  "
                }
              >
                {language == "en" ? "Articles" : "必读"}
              </span>
            </Navbar.Link>
          </div>
          <div className=" my-auto">
            <Navbar.Link href="/events">
              <span
                className={
                  navbar
                    ? "text-white md:text-[16px]"
                    : "  text-black my-auto md:text-[16px]  "
                }
              >
                {language == "en" ? "Events" : "活动"}
              </span>
            </Navbar.Link>
          </div>
          <div className=" my-auto">
            <Navbar.Link href="/policies">
              <span
                className={
                  navbar
                    ? "text-white md:text-[16px]"
                    : "  text-black my-auto md:text-[16px]  "
                }
              >
                {language == "en" ? "Policies & Regulations" : "政策法规"}
              </span>
            </Navbar.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

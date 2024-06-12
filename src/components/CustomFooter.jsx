"use client";
import React from "react";
import Image from "next/image";
import { getDoc, doc } from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../firebase/page";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const CustomFooter = () => {
  const { language, changeLanguage } = useLanguage();
  const [address, setAddress] = useState("");
  const [barcode, setBarcode] = useState("");
  const [email, setEmail] = useState("");
  const [fb, setFb] = useState("");
  const [chinaHeading, setChinaHeading] = useState("");
  const [inggrisHeading, setInggrisHeading] = useState("");
  const [ig, setIg] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [chinaParagraph, setChinaParagraph] = useState("");
  const [inggrisParagraph, setInggrisParagraph] = useState("");
  const [phone, setPhone] = useState("");
  const [wechat, setWechat] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    getDataAboutAdress();
    getDataAboutBarcode();
    getDataAboutEmail();
    getDataAboutFb();
    getDataHomeHeading();
    getDataAboutIg();
    getDataAboutLinkedin();
    getDataHomeParagraph();
    getDataAboutPhone();
    getDataAboutWechat();
    getDataLogoFooter();
  }, []);

  async function getDataAboutWechat() {
    try {
      const docRef = doc(db, "editAbout", "wechat");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setWechat(data[0].link);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataAboutPhone() {
    try {
      const docRef = doc(db, "editAbout", "phone");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setPhone(data[0].no);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataHomeParagraph() {
    try {
      const docRef = doc(db, "editAbout", "paragraph");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setChinaParagraph(data[0].chinese);
      setInggrisParagraph(data[0].english);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataAboutLinkedin() {
    try {
      const docRef = doc(db, "editAbout", "linkedin");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setLinkedin(data[0].link);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataAboutIg() {
    try {
      const docRef = doc(db, "editAbout", "ig");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setIg(data[0].link);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataHomeHeading() {
    try {
      const docRef = doc(db, "editAbout", "heading");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setChinaHeading(data[0].chinese);
      setInggrisHeading(data[0].english);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataAboutAdress() {
    try {
      const docRef = doc(db, "editAbout", "address");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setAddress(data[0].address);
    } catch (error) {
      console.log(error);
    }
  }
  async function getDataAboutBarcode() {
    try {
      const docRef = doc(db, "editAbout", "barcode");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setBarcode(data[0].img);
    } catch (error) {
      console.log(error);
    }
  }
  async function getDataAboutEmail() {
    try {
      const docRef = doc(db, "editAbout", "email");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setEmail(data[0].email);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataAboutFb() {
    try {
      const docRef = doc(db, "editAbout", "facebook");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setFb(data[0].link);
    } catch (error) {
      console.log(error);
    }
  }
  async function getDataLogoFooter() {
    try {
      const docRef = doc(db, "editHomePage", "logoFooter");
      const querySnapshot = await getDoc(docRef);

      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setLogo(data[0].img);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" w-full bg-[#153045] ">
      <div className="w-full md:flex grid p-5 sm:p-8 md:p-12 gap-10 ">
        <div className=" md:w-5/12">
          <img src={logo} width={200} height={75} />
          {/* <Image src={logo} width={200} height={75} /> */}
          <p className=" py-4 text-white text-[15px]">
            {language == "en" ? inggrisParagraph : chinaParagraph}
          </p>
        </div>
        <div className="md:w-4/12 ">
          <p className=" uppercase font-bold text-white">
            {" "}
            {language == "en" ? "Contact Us" : "联系我们"}
          </p>
          <a href={`https://www.google.com/maps/search/${address}`}>
            <p className=" text-white pt-3 pb-2 hover:translate-x-1 duration-100 hover:text-blue-200 ">
              {address}
            </p>
          </a>
          <div className=" flex gap-3 py-2">
            <img
              src="/assets/images/call (2).png"
              alt=""
              className="w-5 h-5 my-auto"
            />
            <p className=" text-white my-auto">{phone}</p>
          </div>
          <div className=" flex gap-3 py-2">
            <img
              src="/assets/images/email (4).png"
              alt=""
              className="w-5 h-5 my-auto"
            />
            <a href={`mailto:${email}`}>
              <p className=" text-white my-auto hover:translate-x-1 duration-100 hover:text-blue-200">
                {email}
              </p>
            </a>
          </div>
        </div>
        <div className=" py-4 md:py-0 ">
          <p className=" text-white font-bold">
            {language == "en" ? "Our Social Media" : "我们的社交媒体"}
          </p>
          <div className=" flex gap-4">
            <img src={barcode} alt="" className=" w-40" />
            <div className=" ">
              <a href={`https://wa.me/${fb}`}>
                <img
                  src="/assets/images/wa.svg"
                  alt=""
                  className=" w-6 h-6 hover:scale-110"
                />
              </a>
              <a href={linkedin}>
                <img
                  src="/assets/images/linkedin.png"
                  alt=""
                  className=" w-6 h-6 hover:scale-110 my-5"
                />
              </a>
              <a href={`https://www.instagram.com/${ig}`}>
                <img
                  src="/assets/images/instagram (2).png"
                  alt=""
                  className=" w-6 h-6 hover:scale-110 mb-5"
                />
              </a>
              <a href={wechat}>
                <img
                  src="/assets/images/we.png"
                  alt=""
                  className=" h-6 hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className=" w-full bg-white " />
      <div className=" md:flex lg:justify-between md:p-5 pt-5  text-center ">
        <span className=" text-white ">
          Copyright &copy; 2024 ASK Creative
        </span>
        <br />
        <span className=" text-white lg:visible invisible">
          Powered by Fikri Zaki Aditama
        </span>
      </div>
    </div>
  );
};

export default CustomFooter;

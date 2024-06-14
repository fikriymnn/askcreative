"use client";
import React from "react";
import Iframe from "react-iframe";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import emailjs from "@emailjs/browser";
import Navbar from "../newcomps/navbar";

function AboutPage({
  address,
  email,
  heading,
  paragraph,
  phone,
}) {
  const { language, changeLanguage } = useLanguage();

  const [sendEmail, setSendEmail] = useState("");
  const [name, setName] = useState("");
  const [sendPhone, setSendPhone] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const sendMail = async (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_lu2s5ci",
        "template_9nqk4cb",
        form.current,
        "-Ogru2wb76QTdI6Ci"
      )
      .then(
        (result) => {
          alert("message send");
        },
        (error) => {
          alert("message error");
        }
      );
  };
  return (
    <>
      <Navbar />
      <div className="py-5 px-6 bg-gray-200 pt-36">

        <div className="bg-white px-5 mx-10 md:px-[5%] sm:px-10 mt-10 py-2 ">
          <p className=" text-blue-600 text-[32px] font-semibold pb-4 font-sans">
            {heading}
          </p>
          <p className=" text-[19px] font-sans">
            {paragraph}
          </p>
          <div className="md:grid md:grid-cols-2 py-10 gap-2 text-sm ">
            <div>
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d386.0204289215479!2d107.5996643639368!3d-6.861282681385571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e77d124a74eb%3A0xf274d96636b2d4a3!2sAskreatif!5e0!3m2!1sen!2sid!4v1718340514789!5m2!1sen!2sid"
                width=""
                height=""
                id=""
                className="w-full h-80 md:pr-4"
                display="block"
                position=""
              />

            

              <div className="flex items-center space-x-3 pt-6">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-[1.5rem] w-auto text-primary text-blue-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="my-auto text-base">{address}</div>
              </div>

              <div className="flex gap-4  pt-6">
                <Image
                  src={"/assets/images/call (1).png"}
                  width={20}
                  height={20}
                  alt=""
                  className=" "
                />
                <p className=" my-auto text-base">{phone}</p>
              </div>
              <div className="flex gap-4  pt-6">
                <Image
                  src={"/assets/images/email (3).png"}
                  width={20}
                  height={20}
                  alt=""
                  className=" "
                />
                <p className=" my-auto text-base">{email}</p>
              </div>
            </div>
            {/* <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
          </form> */}
            <div>
              <form ref={form} onSubmit={(e) => sendMail(e)}>
                <div className="">
                  <h1 className=" text-md pb-3 md:pt-0 sm:pt-0 pt-10">
                    {language == "en" ? "Name" : "名称"}
                  </h1>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Input your name"
                    color=" bg-transparent"
                    className=" rounded-md w-full border-slate-300 "
                  />
                </div>
                <div className=" py-5">
                  <h1 className=" text-md pb-3">
                    {language == "en" ? "Email" : "电子邮箱"}
                  </h1>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="Input your email"
                    color=" bg-transparent"
                    className=" rounded-md w-full border-slate-300 "
                  />
                </div>
                <div className="">
                  <h1 className=" text-md pb-3">
                    {language == "en" ? "Phone Number" : "电话号"}
                  </h1>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Input your phone number"
                    color=" bg-transparent"
                    className=" rounded-md w-full border-slate-300 "
                  />
                </div>
                <div className=" py-5">
                  <h1 className=" text-md pb-3">
                    {language == "en" ? "Message" : "请输入您想咨询的问题"}
                  </h1>
                  <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Input your message"
                    color=" bg-transparent"
                    className=" w-full resize-none rounded-md border-slate-300 "
                    maxLength={100}
                  ></textarea>
                </div>
                <button
                  className=" w-full h-12 bg-blue-600 py-2 px-5"
                  type="submit"
                  value="Send"
                >
                  <div>
                    <p className=" text-white text-center my-auto ">
                      {language == "en" ? "Send Message" : "发送"}
                    </p>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
}

export default AboutPage;

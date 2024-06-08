"use client";
import React from "react";
import { Card } from "flowbite-react";
function MainCard({
  icon,
  title,
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
}) {
  return (
    <div className="group block md:rounded-lg sm:rounded-lg rounded-none md:p-6 p-0 md:bg-white sm:bg-white bg-blue-600 shadow-lg  md:hover:bg-blue-600 sm:hover:bg-blue-600 group-hover:text-white first-linexport service-list hover:bg-primary md:hover:text-white sm:hover:text-white cursor-pointer transition-all md:h-[550px] sm:h-[550px] border-2">
      <div
        className="flex items-baseline text-gray-900 md:text-[#007aff]  
                      p-5"
      >
        {icon1}
        {icon2}
        {icon3}
        {icon4}
        {icon5}
        <a
          href=""
          className=" md:border-none ml-1 text-[19px] font-semibold my-auto  md:text-black sm:text-black text-white  group-hover:text-white pl-3 "
        >
          {title}
        </a>
      </div>
      {title ? <hr className="" /> : <></>}

      <div className="my-7 space-y-5">
        <div className="flex space-x-3 ">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white group-hover:text-white pl-3"
          >
            {text1}
          </a>
        </div>
        {text1 ? <hr className="" /> : <></>}

        <div className="flex space-x-3 ">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white group-hover:text-white pl-3"
          >
            {text2}
          </a>
        </div>
        {text2 ? <hr className="" /> : <></>}
        <div className="flex space-x-3 ">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white group-hover:text-white pl-3"
          >
            {text3}
          </a>
        </div>
        {text3 ? <hr className="" /> : <></>}
        <div className="flex space-x-3 ">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white group-hover:text-white pl-3"
          >
            {text4}
          </a>
        </div>
        {text4 ? <hr className="" /> : <></>}
        <div className="flex space-x-3 ">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white group-hover:text-white pl-3"
          >
            {text5}
          </a>
        </div>
        {text5 ? <hr className="" /> : <></>}
        <div className="flex space-x-3">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white  group-hover:text-white pl-3"
          >
            {text6}
          </a>
        </div>
        {text6 ? <hr className="" /> : <></>}
        <div className="flex space-x-3">
          <a
            href=""
            className="text-base font-normal leading-tight md:text-black sm:text-black text-white group-hover:text-white pl-3"
          >
            {text7}
          </a>
        </div>
        {text7 ? <hr className="" /> : <></>}
      </div>
    </div>
  );
}

export default MainCard;

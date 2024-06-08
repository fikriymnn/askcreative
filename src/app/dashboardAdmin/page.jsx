"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navigation from "@/components/admin/navigation";

function page() {
  return (
    <>
      <div className="flex">
        <Navigation />
        <div className="w-full h-screen flex justify-center items-center p-5">
          <div className="w-full h-full text-white bg-[#0d3064] py-7">
            <div className="flex items-center justify-center">

              <img
                src="/assets/images/tys-logo.png"
                alt=""
                className="mx-5 w-10/12 opacity-100"
              />
            </div>
            <div className="h-56 flex items-center justify-center text-5xl">

              <p>Selamat Datang</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

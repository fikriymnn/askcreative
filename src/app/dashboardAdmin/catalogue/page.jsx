"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navigation from "@/components/admin/navigation";

import Image from "next/image";


function Catalogue() {
  return (
     <div className="flex">
        <Navigation catalogue="ps-3 text-[#184737] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll">
          <div className="w-full bg-[#184737] ">
            <p className="pt-5 text-center font-bold text-3xl text-white">
              Catalogue
            </p>
            <div className="p-5 flex flex-col gap-5">
              <a href="/dashboardAdmin/catalogue/perfume_aromaterapi" className="bg-white rounded-md p-5 text-2xl font-semibold">
                <h2>Produk Parfum dan Aromaterapi</h2>
              </a>
               <a href="/dashboardAdmin/catalogue/bahan" className="bg-white rounded-md p-5 text-2xl font-semibold">
                <h2>Bahan Parfum dan Aromaterapi</h2>
              </a>
               <a href="/dashboardAdmin/catalogue/labtool" className="bg-white rounded-md p-5 text-2xl font-semibold">
                <h2>Alat Labolatorium Skala Mikro</h2>
              </a>
            </div>
          
          </div>
        </div>
      </div>
  )
}

export default Catalogue

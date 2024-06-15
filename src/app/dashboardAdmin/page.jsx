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
            <p>Event Overview</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

import React from "react";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import CardTwo from "@/components/CardTwo";

function PackageDetails() {
  return (
    <>
      <NavbarWithCTAButton />
      <div className="bg-slate-100 w-full py-24  ">
        <p className="font-bold text-3xl text-center py-10 ">
          Choose The Best Package You Need
        </p>
        <div className="md:hidden sm:hidden  "></div>
        <div className="bg-slate-100 w-full py-4 mt-6 md:grid md:grid-cols-3 gap-3 p-5 md:visible sm:visible hidden ">
          <CardTwo
            title={"Pendirian PT mlllmomplete"}
            price={"RP.15.000.00"}
            text1={"Package Includes:"}
            text2={"Brand Perfomance Analytics"}
            text3={"Daily Prices Change Notifications"}
            text4={"Marketplace Price Tracking"}
            text5={"Stock Availability Monitoring"}
            text6={"Marketplace Price Tracking"}
          />
          <CardTwo
            title={"Pendirian PT PMA Complete"}
            price={"RP.15.000.00"}
            text1={"Package Includes:"}
            text2={"Brand Perfomance Analytics"}
            text3={"Daily Prices Change Notifications"}
            text4={"Marketplace Price Tracking"}
            text5={"Stock Availability Monitoring"}
            text6={"Marketplace Price Tracking"}
          />
          <CardTwo
            title={"Pendirian PT PMA Complete"}
            price={"RP.15.000.00"}
            text1={"Package Includes:"}
            text2={"Brand Perfomance Analytics"}
            text3={"Daily Prices Change Notifications"}
            text4={"Marketplace Price Tracking"}
            text5={"Stock Availability Monitoring"}
            text6={"Marketplace Price Tracking"}
          />
        </div>
      </div>
      <CustomFooter />
    </>
  );
}

export default PackageDetails;

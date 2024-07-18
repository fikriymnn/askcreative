'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrollLocation, setScrollLocation] = useState(0);
  const [prevScrollLocation, setPrevScrollLocation] = useState(0);
  const [scrollDirection, setScrollDirection] = useState();
const [dropdown, setDropdown] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollLocation = window.scrollY;
      setScrollLocation(currentScrollLocation);

      // Check if scrollLocation is decreasing
      if (currentScrollLocation < prevScrollLocation) {
        // Scroll location is decreasing
        setScrollDirection("up");
      } else if (currentScrollLocation > prevScrollLocation) {
        // Scroll location is increasing
        setScrollDirection("down");
      }

      // Update prevScrollLocation with currentScrollLocation
      setPrevScrollLocation(currentScrollLocation);
    };

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollLocation]);
  return (
    <div className={`relative z-50 `}>
      <div className={`w-screen flex flex-col  fixed ${scrollDirection == 'down' ? '-translate-y-[88px]' : ''} duration-300`}>
        <div className='h-14 bg-[#184737] pt-2 flex justify-center'>
          <img className="h-full" src="/assets/images/asklogo2.png" alt="" />
        </div>
        <div className=' h-8 flex justify-center bg-[#123227] text-[7px] p-1 text-white text-center'>
          <p className='flex flex-col'><span>Essential Oil</span> <span>Health and Beauty</span></p>
        </div>
        <div className='flex flex-col '>

          <div className='h-16 bg-white flex justify-between ps-3 pe-20 items-center'>
            <img className="h-12 rounded-md" src="/assets/images/asklogo2.png" alt="" />
            <div className="w-4/6 flex justify-between items-center text-[#123227] text-xl font-bold">
              <a className="hover:bg-[#184737] p-2 rounded-md px-3 hover:text-white" href="/">Beranda</a>
              <a className="hover:bg-[#184737] p-2 rounded-md px-3 hover:text-white" href="/events">Kegiatan</a>
              <div className="flex flex-col items-start justify-start">
              <button onClick={()=> setDropdown(!dropdown)} className="hover:bg-[#184737] p-2 rounded-md px-3 hover:text-white cursor-pointer"> Layanan</button>
{dropdown == true && (
  <>
  <div className="fixed flex flex-col translate-y-12 bg-white rounded-md text-[#184737] py-2">
    
  <Link href={'/workshop_aromaterapi'} className="hover:bg-[#184737] hover:text-white px-2 text-base font-normal"> Workshop Aromaterapi</Link>
  <Link href={'/workshop_parfum'} className="hover:bg-[#184737] hover:text-white px-2 text-base font-normal"> Workshop Parfum</Link>
  <Link href={'/'} className="hover:bg-[#184737] hover:text-white px-2 text-base font-normal"> Buat Parfum dan Aromaterapi Kamu Sendiri</Link>
  <Link href={'/produk_labtool'} className="hover:bg-[#184737] hover:text-white px-2 text-base font-normal"> Alat Labolatorium Skala Mikro</Link>
  <Link href={'/produk_bahan'} className="hover:bg-[#184737] hover:text-white px-2 text-base font-normal"> Bahan Parfum dan Aromaterapi</Link>
  <Link href={'/produk'} className="hover:bg-[#184737] hover:text-white px-2 text-base font-normal"> Produk Parfum dan Aromaterapi</Link>
  </div>
  
  </>
)}
              </div>
              <a className="hover:bg-[#184737] p-2 rounded-md px-3 hover:text-white" href="/articles">Artikel</a>
              <a className="hover:bg-[#184737] p-2 rounded-md px-3 hover:text-white" href="/galeri">Galeri</a>
              <a className="hover:bg-[#184737] p-2 rounded-md px-3 hover:text-white" href="/about">Tentang</a>

              <div className="flex gap-2">
                <button className="border border-slate-300">
                  <img
                    src="https://flagcdn.com/h20/id.png"
                    srcSet="https://flagcdn.com/h40/id.png 2x,
                    https://flagcdn.com/h60/id.png 3x"
                    height="20"
                    alt="ID" />
                </button>
                <button className="border border-slate-300">
                  <img
                    src="https://flagcdn.com/h20/gb.png"
                    srcSet="https://flagcdn.com/h40/gb.png 2x,
                    https://flagcdn.com/h60/gb.png 3x"
                    height="20"
                    alt="EN" />
                </button>
              </div>
            </div>
          </div>
          <div>

            <div className=' absolute w-10 h-10'>
              <svg width="100" height="100" viewBox="0 0 745 745" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M745 0H0V745H1.4873C25.8096 345.514 345.515 25.8091 745 1.4873V0Z" fill="white" />
              </svg>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

'use client'
import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrollLocation, setScrollLocation] = useState(0);
  const [prevScrollLocation, setPrevScrollLocation] = useState(0);
  const [scrollDirection, setScrollDirection] = useState();

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
        <div className='h-14 bg-[#153045] pt-2 flex justify-center'>
          <img className="h-full" src="/assets/images/ask.png" alt="" />
        </div>
        <div className=' h-8 flex justify-center bg-[#0E2233] text-[7px] p-1 text-white text-center'>
          <p className='flex flex-col'><span>Essential Oil</span> <span>Health and Beauty</span></p>
        </div>
        <div className='flex flex-col '>

          <div className='h-16 bg-white flex justify-between ps-3 pe-20 items-center'>
            <img className="h-12" src="/assets/images/asksq.png" alt="" />
            <div className="w-4/6 flex justify-between items-center text-[#0E2233] text-xl font-bold">
              <a className="hover:bg-[#153045] p-2 rounded-md px-3 hover:text-white" href="/">Home</a>
              <a className="hover:bg-[#153045] p-2 rounded-md px-3 hover:text-white" href="/event">Events</a>
              <a className="hover:bg-[#153045] p-2 rounded-md px-3 hover:text-white" href="/">Services</a>
              <a className="hover:bg-[#153045] p-2 rounded-md px-3 hover:text-white" href="/about">About</a>
              <a className="hover:bg-[#153045] p-2 rounded-md px-3 hover:text-white" href="/">Articles</a>
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

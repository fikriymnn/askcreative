import React from 'react'
import Image from "next/image";

function LandCarousel({heading,paragraph,img}) {
  return (
    <div className="bg-black">
        <div className='flex h-[120vh] items-center justify-center bg-left bg-cover relative text-white'>
        <div className='w-full h-full absolute'>
         <Image alt="" src={img} width={1080} height={1080} className="w-full h-full md:rounded-t-3xl rounded-s-3xl" />
        </div>
          <div
            className="w-full h-full flex items-center bakg absolute p-5 lg:px-[10%] py-[20vh] lg:py-[30vh]  "
          >
            <div className="flex flex-col text-left lg:max-w-[55%]">
              <div className="font-semibold text-[2.5rem] lg:text-[3rem]">
                <p>{heading}</p>
              </div>
              <div className="mt-2 lg:text-[1.2rem]">
                <p>{paragraph}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandCarousel

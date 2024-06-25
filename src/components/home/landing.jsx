import React, {useState} from 'react'
import LandingCarousel from '@/components/home/landing-carousels'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

function Landing() {const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [hide, setHide] = useState(false);

  return (
  //  <div className="bg-black">
  //       <div className='flex items-center justify-center bg-left bg-cover bg-[url("/assets/images/bgtwo.png")] text-white'>
  //         <div
  //           className="w-full h-full flex items-center bakg  p-5 lg:px-[10%] py-[20vh] lg:py-[30vh]  "
  //         >
  //           <div className="flex flex-col text-left lg:max-w-[55%]">
  //             <div className="font-semibold text-[2.5rem] lg:text-[3rem]">
  //               {dataHeading.map((data, i) => {
  //                 return (
  //                   <p key={i}>
  //                    {data.english}
  //                   </p>
  //                 );
  //               })}
  //             </div>
  //             <div className="mt-2 lg:text-[1.2rem]">
  //               {dataParagraph.map((data, i) => {
  //                 return (
  //                   <div key={i}>
  //                     {data.english}
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //             {/* <a
  //               href="#about"
  //               className="bg-primary w-fit px-5 font-semibold py-3 mt-6 flex items-center space-x-2 cursor-pointer hover:brightness-110 transition-all"
  //             >
  //               <div>GET STARTED</div>
  //             </a> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  <div>
    <div onMouseEnter={() => setHide(true)} onMouseLeave={() => setHide(false)}>
      <Carousel
        className="pb-8 mb-10 md:w-full "
        responsive={responsive}
        autoPlay={true}
        infinite={"true"}
        showDots="true"
        autoPlaySpeed={1700}
        arrows={hide == true ? true : false}
      >
        <LandingCarousel/>
        <LandingCarousel/>
        <LandingCarousel/>
      </Carousel>
    </div>
    
    
  </div>
  )
}

export default Landing

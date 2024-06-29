'use client'
import React from 'react'
import { useState, useEffect } from "react";
import LandingCarousel from '@/components/home/landing-carousels'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../firebase/page";

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

  const [dataHeading, setDataHeading] = useState([]);
  useEffect(() => {
    
    getDataHeading();
  }, []);

  const getDataHeading = async () => {
    try {
      try {
        const querySnapshot = await getDocs(collection(db, "heading"));
        let data = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        setDataHeading(data);
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
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
         {dataHeading.map((data,i) => {
                            return(
                              <>
                               <LandingCarousel heading={data.heading} key={i} paragraph={data.paragraph} img={data.img}/>
                              </>)
})}
       
      
      </Carousel>
    </div>
    
    
  </div>
  )
}

export default Landing

"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  orderBy,
  limit,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../firebase/page";

function MultipleCarousel() {
  const [dataClient, setDataClient] = useState([]);

  useEffect(() => {
    getDataClient();
  }, []);

  async function getDataClient() {
    let data = [];

    try {
      const querySnapshot = await getDocs(collection(db, "clients"));

      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id });
      });
      setDataClient(data);
    } catch (error) {
      alert(error);
    }
    return data;
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [hide, setHide] = useState(false);

  return (
    <div onMouseEnter={() => setHide(true)} onMouseLeave={() => setHide(false)}>
      <Carousel
        className="pb-8 mb-10 md:w-full "
        responsive={responsive}
        autoPlay={true}
        infinite={"true"}
        showDots="true"
        autoPlaySpeed={2000}
        arrows={hide == true ? true : false}
      >
        {dataClient.map((data, i) => {
          return (
            <>
              <div className="text-white flex justify-center items-center h-full">
                <Image
                  key={i}
                  className="md:w-[200px] w-32"
                  src={data.img}
                  width={200}
                  height={200}
                  alt=""
                />
              </div>
            </>
          );
        })}
      </Carousel>
    </div>
  );
}

export default MultipleCarousel;

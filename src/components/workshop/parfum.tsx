"use client";
import React from "react";
import CardTwo from "@/components/CardTwo";
import NavbarWithCTAButton from "@/components/NavbarWithCTAButton";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "../newcomps/navbar";
import Navigation from "@/components/admin/navigation";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  doc,
  Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../firebase/page";
import Image from "next/image";

interface Registrant {
  // Define the structure of registrant data
  name: string;
  email: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  registrants: Registrant[];
  img: any;
  titleEnglish: any;
  durationFrom: any;
  timeFrom: any;
  location: any;
  feeRupiah: any;
  quota: any;
}

function Parfum({
  title,
  description,
  layanan,
  images,
}: {
  title: String;
  description: String;
  layanan: any;
  images: any;
}) {
  const { language, changeLanguage } = useLanguage();
  const getData = async () => {
    try {
      const serveRef = doc(db, "parfum_workshop", "services");
      const serveSnap = await getDoc(serveRef);

      setEvents(serveSnap.data()?.services || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);
  const getDataEv = async () => {
    try {
      const docRef = doc(db, "parfum_workshop", "services");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return Array.isArray(data.services) ? data.services : []; // Fetch the services array
      } else {
        console.log("No such document!");
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const evData = await getDataEv();
      setEventsId(evData); // Set the fetched services to eventsId
      await getEv(evData); // Fetch events using the IDs from services
    };

    fetchData();
  }, []); // Run only on component mount

  const [eventsId, setEventsId] = useState<string[]>([]); // Your actual event IDs
  const [events, setEvents] = useState<Event[]>([]);

  const getEv = async (ids: string[]) => {
    let data: Event[] = [];
    try {
      for (const id of ids) {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const event = docSnap.data() as Omit<Event, "id" | "registrants">;
          const registrantsSnapshot = await getDocs(
            collection(docRef, "registran")
          );
          const registrants = registrantsSnapshot.docs.map(
            (doc) => doc.data() as Registrant
          );

          data.push({ ...event, id: docSnap.id, registrants });
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setEvents(data); // Update state with fetched data
  };

  return (
    <>
      <Navbar />

      <>
        <div className="bg-gray-200 pt-44 pb-5 ps-5 pe-5 flex flex-col items-center">
          <div className="md:flex hidden pb-5 gap-1 w-10/12 justify-start">
            <p>Workshop </p> <p>&gt;</p>
            <p className="text-blue-600">{title}</p>
          </div>
          <div className="bg-white md:w-10/12 w-12/12 md:mt-0 mt-7">
            <div className="relative px-5 pt-5">
              <div className="md:grid sm:grid md:grid-cols-2 sm:grid-cols-1 grid grid-cols-1 mb-5 w-full">
                <div
                  className="bg-gray-100 md:w-[500px] md:h-[300px] w-full h-[300px]  mt-2 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${images})`,
                  }}
                ></div>
                <div className="md:ps-5 ps-">
                  <p className="md:text-2xl text-2xl pb-4">{title}</p>
                  <div className="flex gap-1 pb-6">{description}</div>
                </div>
              </div>
              <div className="text-2xl font-medium">
                <p> {language == "en" ? "Kegiatan: " : "服务: "}</p>
              </div>

              {/* ======== */}
              <div className="">
              <div className="grid grid-cols-2 md:grid-cols-3 md:gap-10 gap-2  px-0 mt-10 pb-5 md:w-11/12 w-full">

{events.map((event, i) => {
  return (
    <div key={i} className="rounded-md">
      <a href={`/events/event?id=${event.id}`}>
        <div className="bg-white rounded-3xl shadow-xl md:hover:translate-y-[-10px] transition-transform duration-50 ease-in-out  md:flex md:flex-col h-full ">
          <div
            className="bg-blue-700 md:mb-5 md:rounded-t-3xl rounded-s-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${event.img})` }}
          >
            <Image alt="" src={event.img} width={1000} height={1000} className="w-full h-full md:rounded-t-3xl rounded-s-3xl" />

          </div>

          <div className="px-3 pb-3 flex flex-col justify-between md:mt-0 mt-2  ">
            <p className="lg:text-base md:text-xs sm:text-sm text-[10px] min-h-[30px] font-semibold text-black  line-clamp-2 ">

              {event.titleEnglish}

            </p>
            <div>
              <div className="flex text-[10px] md:mb-0 mb-2 lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
                <div className="lg:mt-2">
                  { event.durationFrom
                    }{" "}
                </div>
                <p className="lg:text-base md:text-xs sm:text-sm text-xs translate-y-[1px] md:translate-y-[4px]">
                  &#8226;
                </p>
                <div className="lg:mt-2">{event.timeFrom}</div>
              </div>
              <h2 className="text-gray-500 lg:text-base md:text-xs sm:text-sm text-xs">
                {event.location}
              </h2>
              <div className=" w-full justify-between">
                <h2 className="font-medium text-gray-800 lg:text-base md:text-xs sm:text-sm text-xs">
                  {
                    event.feeRupiah
                  }
                </h2>
                <h2 className="lg:text-base md:text-xs sm:text-sm text-xs">Available Quota : {event.quota}</h2>

              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
})
}

</div>
              </div>
            </div>
          </div>
        </div>
      </>

      <CustomFooter />
    </>
  );
}

export default Parfum;

"use client";
import React from "react";
import { useState, useEffect } from "react";
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
import { db, storage, firebaseAnalytics } from "../../../../../firebase/page";
import Image from "next/image";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";


function Aromatheraphy() {

const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["code-block", "link"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],
        ["clean"],
      ],
    },
  };
  const formats = [
    "strike",
    "bold",
    "italic",
    "underline",
    "link",
    "align",
    "direction",
    "list",
    "code-block",
    "script",
    "indent",
    "direction",
    "color",

    "background",
  ];
  
  const [title, setTitle] = useState("");
  const [desIng, setDesIng] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/workshops/${files.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url

          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setDownloadURL(url);
            setLoading(false);
          });
        }
      );
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const addData = async (e) => {
  e.preventDefault();

  try {
    const descriptionRef = doc(db, "aromaterapi_workshop", "description");
    const titleRef = doc(db, "aromaterapi_workshop", "title");
    const imgRef = doc(db, "aromaterapi_workshop", "thumbnail");
    const serveRef = doc(db, "aromaterapi_workshop", "services");

  if (desIng) {
      await updateDoc(descriptionRef, {
        description: desIng,
      });
 }

  if (titleRef) {
      await updateDoc(titleRef, {
        title: title,
      });
 }
    if (selectedButtons) {
        await updateDoc(serveRef, {
          services: selectedButtons,
        });
 }

    if (downloadURL) {
      await updateDoc(imgRef, {
        img: downloadURL,
      });
    }

    alert("Success");
  } catch (error) {
    alert(error.message);
  }
};

  const getData = async () => {
    try {
      const descriptionRef = doc(db, "aromaterapi_workshop", "description");
      const titleRef = doc(db, "aromaterapi_workshop", "title");
      const imgRef = doc(db, "aromaterapi_workshop", "thumbnail");
      const serveRef = doc(db, "aromaterapi_workshop", "services");

      const descriptionSnap = await getDoc(descriptionRef);
      const titleSnap = await getDoc(titleRef);
      const imgSnap = await getDoc(imgRef);
      const serveSnap = await getDoc(serveRef);

      // Update state with fetched data
      setDesIng(descriptionSnap.data()?.description || '');
      setTitle(titleSnap.data()?.title || '');
      setDownloadURL(imgSnap.data()?.img || '');
      setSelectedButtons(serveSnap.data()?.services || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);


  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    let data = [];
    try {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
        const event = doc.data();
        const registrantsSnapshot = await getDocs(collection(doc.ref, "registran"));
        const registrants = registrantsSnapshot.docs.map(doc => doc.data());

        data.push({ ...event, id: doc.id, registrants });
      }
    } catch (error) {
      console.log(error);
    }
    setEvents(data);
  }

    const [selectedButtons, setSelectedButtons] = useState([]);

const handleButtonClick = (buttonId) => {
    setSelectedButtons((prev) => 
      prev.includes(buttonId)
        ? prev.filter(id => id !== buttonId) // Remove ID if it exists
        : [...prev, buttonId] // Add ID if it doesn't exist
    );
  };

  
  return (
    <div>
      <div className="flex">
        <Navigation packages="ps-3 text-[#184737] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll flex flex-col gap-5">
            <div className="grid grid-cols-6">
             <a
               href="/dashboardAdmin/packages"
                className="bg-red-600 rounded-lg py-2 px-5 text-xl text-white flex justify-center items-center text-center"
              >
                BACK
              </a>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
            </div>
           <div className="flex flex-col gap-3">
             <div className="flex flex-col">
                <p>Image</p>
                <input type="file" name="img" className="w-full resize-none rounded-lg border-slate-300 "
                required
                  onChange={(event) => handleUpload(event.target.files[0])}/>
            </div>
            <div className="flex flex-col">
                <p>Title</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="img" className="w-full resize-none rounded-lg border-slate-300 "/>
            </div>
             <div className="flex flex-col">
                <p>Desctiption</p>
                 <ReactQuill
                  modules={modules}
                  value={desIng}
                  format={formats}
                  onChange={(e) => setDesIng(e)}
                  name="contentIng"
                  placeholder={`Input Description English For Description ${1}`}
                  maxLength={1000}
                  className="h-[200px] w-full   pb-10"
                />
            </div>
             <div className="flex flex-col">
                <p>Events</p>
                
                <button className="p-3 mb-3 text-white rounded-md bg-blue-500" onClick={fetchData}>SELECT EVENTS</button>
                <div>
      <div id="eventsContainer" className="grid grid-cols-5 gap-3">
        {events.map(event => (
             <div key={event.id} className="rounded-md ">
                    <button onClick={() => handleButtonClick(event.id) }
                    className={selectedButtons.includes(event.id) ? 'border-2 border-blue-500 rounded-3xl' : ''} 
                 
            >
                      <div className={ `${selectedButtons.includes(event.id) ? 'bg-blue-200' : 'bg-white '} rounded-3xl shadow-xl  transition-transform duration-50 ease-in-out grid grid-cols-2 md:flex md:flex-col h-full `}>
                        <div
                          className="bg-blue-700 md:mb-5 md:rounded-t-3xl rounded-s-3xl md:grid grid-cols-1  bg-cover bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${event.img})` }}
                        >
                          <Image alt="" src={event.img} width={100} height={100} className="w-full h-full md:rounded-t-3xl rounded-s-3xl" />

                        </div>

                        <div className="px-3 pb-3 flex flex-col justify-between ">
                          <p className="lg:text-base md:text-xs sm:text-sm text-xs h-12 font-semibold text-black line-clamp-2  ">

                            {event.titleEnglish}

                          </p>
                          <div>
                            <div className="lg:flex text-[11px] lg:text-base md:text-xs sm:text-sm text-xs md:gap-1 font-medium text-gray-800">
                              <div className="lg:mt-2">
                                {event.durationFrom}{" "}
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
                              <h2 className="lg:text-base md:text-xs sm:text-sm text-xs">Kuota Tersedia : {event.quota}</h2>

                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
        //   <div key={event.id} className="event">
        //     <h3>{event.titleEnglish}</h3>
        //     <p>Category: {event.kategori}</p>
        //     <p>Registrants:</p>
        //     <ul>
        //       {event.registrants.map((registrant, index) => (
        //         <li key={index}>{registrant.name}</li>
        //       ))}
        //     </ul>
        //   </div>
        ))}
      </div>
                </div>
            </div>
            {loading? <></>:<>
            <button className="p-3 text-white rounded-md bg-blue-500" onClick={addData}>SAVE</button>
            </>}
           </div>
        </div>
      </div>
    </div>
  )
}

export default Aromatheraphy

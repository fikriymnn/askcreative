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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage, firebaseAnalytics } from "../../../../../../firebase/page";
import Image from "next/image";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";



function AddPerfCat() {
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
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sopi, setSopi] = useState("");
  const [toped, setToped] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/shop/${files.name}`);

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
    
   
    const eventDocRef = await addDoc(collection(db, "produk_bahan"), {
       title:title,
        desc:desIng,
        price:price,
        tokped:toped,
        shopee:sopi,
        kategori:category,
        img:downloadURL,
    });
    alert("success");
}


//   const getData = async () => {
//     try {
//       const descriptionRef = doc(db, "aromaterapi_workshop", "description");
//       const titleRef = doc(db, "aromaterapi_workshop", "title");
//       const imgRef = doc(db, "aromaterapi_workshop", "thumbnail");
//       const serveRef = doc(db, "aromaterapi_workshop", "services");

//       const descriptionSnap = await getDoc(descriptionRef);
//       const titleSnap = await getDoc(titleRef);
//       const imgSnap = await getDoc(imgRef);
//       const serveSnap = await getDoc(serveRef);

//       // Update state with fetched data
//       setDesIng(descriptionSnap.data()?.description || '');
//       setTitle(titleSnap.data()?.title || '');
//       setDownloadURL(imgSnap.data()?.img || '');
//       setSelectedButtons(serveSnap.data()?.services || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  // Fetch data on component mount
//   useEffect(() => {
//     getData();
//   }, []);


  
  return (
    <div>
      <div className="flex">
        <Navigation packages="ps-3 text-[#184737] bg-white rounded-sm" />
        <div className="p-5 w-full h-screen overflow-y-scroll flex flex-col gap-5">
            <div className="grid grid-cols-6">
             <a
               href="/dashboardAdmin/catalogue/bahan/"
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
                <p>Price</p>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="img" className="w-full resize-none rounded-lg border-slate-300 "/>
            </div>
             <div className="flex flex-col">
                <p>Desctiption</p>
                <ReactQuill
                  modules={modules}
                  format={formats}
                  value={desIng}
                  onChange={(e) => setDesIng(e)}
                  name="contentIng"
                  placeholder={`Input Description English For Description ${1}`}
                  maxLength={1000}
                  className="h-[200px] w-full   pb-10"
                />
            </div>
             <div className="flex flex-col">
                <p>Category</p>
                <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="img" className="w-full resize-none rounded-lg border-slate-300 "/>
            </div>
             <div className="flex flex-col">
                <p>Link Tokopedia</p>
                <input value={toped} onChange={(e) => setToped(e.target.value)} type="text" name="img" className="w-full resize-none rounded-lg border-slate-300 "/>
            </div>
            <div className="flex flex-col">
                <p>Link Shopee</p>
                <input value={sopi} onChange={(e) => setSopi(e.target.value)} type="text" name="img" className="w-full resize-none rounded-lg border-slate-300 "/>
            </div>
            
            {loading? <></>:<>
            <button className="p-3 text-white rounded-md bg-blue-500" onClick={addData}>ADD</button>
            </>}
           </div>
        </div>
      </div>
    </div>
  )
}

export default AddPerfCat

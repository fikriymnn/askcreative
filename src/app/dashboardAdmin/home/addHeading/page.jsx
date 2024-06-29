"use client";
import React from "react";
import { useState, useEffect } from "react";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage, firebaseAnalytics } from "../../../../../firebase/page";

function EditHeading() {
  const [isAlert, setIsAlert] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/header/${files.name}`);

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
    
    const eventDocRef = await addDoc(collection(db, "heading"), {
        heading:heading,
        paragraph:paragraph,
        img: downloadURL,
    });
    alert("success");
};
  return (
    <>
      {isAlert && (
        <div className="bgtr w-screen h-screen fixed top-0 flex items-center justify-center gap-5 z-50">
          <div className="flex-col">
            <div className=" text-2xl mb-5">Change Will not be saved</div>
            <div className="flex justify-between">
              <a href="/dashboardAdmin/home">
                <button className="p-3 px-7 hover:bg-blue-500 rounded-lg mb-5 text-white bg-red-700">
                  Oke
                </button>
              </a>
              <button
                className="p-3 px-7 hover:bg-blue-500 rounded-lg mb-5 text-white bg-green-500"
                onClick={() => {
                  setIsAlert(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-full fixed z-40 rounded-xl border-[#007aff] border-2 bgtr top-0">
        <div className=" bg-[#007aff] flex  text-2xl font-semibold py-7 rounded-t-xl text-white ">
          <div className="w-1/12"></div>
          <div className=" w-10/12 flex justify-center items-center">
            <p>Add Landing Heading</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/home">
              <button
                // onClick={openAlert}
                className="bg-red-600 rounded-lg py-2 px-5 text-xl"
              >
                X
              </button>
            </a>
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <div className=" flex py-1 px-20 ">
          <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
            <p>Image</p>
          </div>
          <div className=" w-10/12 p-3">
            <input
              type="file"
              onChange={(event) => handleUpload(event.target.files[0])}
            />
          </div>
        </div>
          <div className=" flex p-5 px-20 ">
            <div className=" w-2/12 text-end p-3 py-5">
              <p>Heading :</p>
            </div>
            <div className=" w-10/12 p-3">
              <textarea
                value={heading || ""}
                onChange={(e) => setHeading(e.target.value)}
                name=""
                id=""
                cols="20"
                rows="5"
                placeholder="Enter New Text"
                color=" bg-transparent"
                className=" w-full resize-none rounded-lg border-slate-300 "
                maxLength={1000}
              ></textarea>
            </div>
          </div>
          <div className=" flex p-5 px-20 ">
            <div className=" w-2/12 text-end p-3 py-5">
              <p>Paragraph :</p>
            </div>
            <div className=" w-10/12 p-3">
              <textarea
                value={paragraph || ""}
                onChange={(e) => setParagraph(e.target.value)}
                name=""
                id=""
                cols="20"
                rows="5"
                placeholder="Enter New Text"
                color=" bg-transparent"
                className=" w-full resize-none rounded-lg border-slate-300 "
                maxLength={1000}
              ></textarea>
            </div>
          </div>
          

          <div className="mx-20">
            <div className=" flex items-end justify-end mx-3">
                {loading ? (
              <p>Loading</p>
            ) : (
             <button
                onClick={(e) => addData(e)}
                className="p-3 px-7 hover:bg-blue-500 rounded-lg mb-5 text-white bg-[#007aff]"
              >
                Save
              </button>
            )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditHeading;

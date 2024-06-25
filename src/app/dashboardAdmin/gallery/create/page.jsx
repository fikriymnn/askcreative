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
import { prototype } from "events";
import { title } from "process";
import { format } from "date-fns";

function AddGallery() {
  const [isAlert, setIsAlert] = useState(false);

  const [downloadURL, setDownloadURL] = useState("");
  const [title, setTitle] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle file upload event and update state

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/galleries/${files.name}`);

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

  const update = async (e) => {
    e.preventDefault();
    var today = new Date();
    var date = today.getDate() + " " + format(today, "MMMM yyyy");
    try {
      const docRef = await addDoc(collection(db, "galleries"), {
        img: downloadURL,
        date: date,
        title: title,
      });

      alert("Success");

      // Update the "completed" field of the todo document to the value of the "checked" property of the event target.

      // Get a reference to the todo document with the given ID in the "todos" collection in Firestore.

      // After updating the todo, fetch all todos for the current user and update the state with the new data.
    } catch (error) {
      console.error("An error occured", error);
    }
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
            <p>Add Client</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/gallery">
              <button
                // onClick={openAlert}
                className="bg-red-600 rounded-lg py-2 px-5 text-xl"
              >
                X
              </button>
            </a>
          </div>
        </div>
<div className="flex flex-col">
<div className=" flex py-1 px-20 ">
          <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
            <p>title</p>
          </div>
          <div className=" w-10/12 p-3">
            <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
          </div>
        </div>
        <div className=" flex py-1 px-20 ">
          <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
            <p>Image</p>
          </div>
          <div className=" w-10/12 p-3">
            <input
              type="file"
              onChange={(event) => handleUpload(event.target.files[0])}
            />
            <p className="text-red-600 pt-2">Image Ratio: 16:9 </p>
            <p className="text-red-600 pt-2">
              minimum image resolution: 1920 x 1080 pixel{" "}
            </p>
          </div>
        </div>
</div>

        <div className="mx-20">
          <div className=" flex items-end justify-end mx-3">
            {loading ? (
              <p>Loading</p>
            ) : (
              <button
                onClick={(e) => update(e)}
                className="p-3 px-7 hover:bg-blue-500 rounded-lg mb-5 text-white bg-[#007aff]"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddGallery;

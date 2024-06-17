"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/components/admin/editor.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../../../../firebase/page";
import { format } from "date-fns";

function CreateEvent() {
  const [isAlert, setIsAlert] = useState(false);
  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };

  const [titleIng, setTitleIng] = useState("");

  const [location, setLocation] = useState("");
  const [feeRupiah, setFeeRupiah] = useState("");

  const [durationFrom, setDurationFrom] = useState("");
  const [durationTo, setDurationTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [desIng, setDesIng] = useState("");
  const [quota, setQuota] = useState();


  const [parsedDateFrom, setParsedDateFrom] = useState("");
  const [parsedDateTo, setParsedDateTo] = useState("");

  const [data, setData] = useState([
    {
      topicIng: "",
      contentIng: "",

      img: [{ img: "" }],
    },
  ]);

  const [downloadURL, setDownloadURL] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/events/${files.name}`);

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

  const handleUpload2 = async (filess, e, i, ii) => {
    const files = filess;
    const { name, value } = e.target;
    const onchangeVal = [...data];

    try {
      setLoading(true);
      const storageRef = ref(storage, `/events/${files.name}`);

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

            onchangeVal[i][name][ii][name] = url;
            setData(onchangeVal);
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
    
    var today = new Date();
    var date = today.getDate() + " " + format(today, "MMMM yyyy");
     const numericalQuota = Number(quota);
    // Add full data to the 'events' collection
    const eventDocRef = await addDoc(collection(db, "events"), {
        titleEnglish: titleIng,
        durationFrom: parsedDateFrom,
        durationTo: parsedDateTo,
        durationFromValue: durationFrom,
        durationToValue: durationTo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        descriptionEnglish: desIng,
        createdAt: today,
        img: downloadURL,
        date: date,
        content: data,
        location: location,
        feeRupiah: feeRupiah,
        quota:numericalQuota,
        capacities:numericalQuota,
    });

    // Add subset data to the 'galleries' collection
    const galleryDocRef = await addDoc(collection(db, "galleries"), {
        title: titleIng,  // Assuming titleEnglish should be used for galleries too
        img: downloadURL,
        date: date,
    });

    alert("success");
};



  const addGallery = async (e) => {
    e.preventDefault();
    var today = new Date();
    var date = today.getDate() + " " + format(today, "MMMM yyyy");
    const docRef = await addDoc(collection(db, "galleries"), {
      titleEnglish: titleIng,
      createdAt: today,
      img: downloadURL,
      date: date,
    });

    alert("success");
  };

  const dateFrom = (e) => {
    const dateValue = e.target.value;
    setDurationFrom(dateValue);

    // Parsing tanggal menggunakan Date Object
    const date = new Date(dateValue);
    const year = format(date, "MMMM yyyy");
    // Bulan dimulai dari 0, jadi tambahkan 1
    const day = date.getDate();

    setParsedDateFrom(day + " " + year);
  };

  const dateTo = (e) => {
    const dateValue = e.target.value;
    setDurationTo(dateValue);

    // Parsing tanggal menggunakan Date Object
    const date = new Date(dateValue);
    const year = format(date, "MMMM yyyy");
    // Bulan dimulai dari 0, jadi tambahkan 1
    const day = date.getDate();

    setParsedDateTo(day + " " + year);
  };

  const handleClick = () => {
    setData([
      ...data,
      {
        topicIng: "",
        topicChi: "",
        contentIng: "",
        contentChi: "",
        img: [""],
      },
    ]);
  };

  const handleClickImg = (i) => {
    //setData([data[i].img.push("")]);
    const onchangeVal = [...data];
    onchangeVal[i]["img"].push({ img: "" });
    setData(onchangeVal);
  };

  const handleDeleteImg = (i, ii) => {
    const deleteVal = [...data];
    deleteVal[i]["img"].splice(ii, 1);
    setData(deleteVal);
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };
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
  return (
    <>
      {isAlert && (
        <div className="bgtr w-screen h-screen fixed top-0 flex items-center justify-center gap-5 z-50">
          <div className="flex-col">
            <div className=" text-2xl mb-5">Change Will not be saved</div>
            <div className="flex justify-between">
              <a href="/dashboardAdmin/events">
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

      <div className="w-full  z-40 rounded-xl border-[#007aff] border-2  top-0">
        <div className=" bg-[#007aff] flex  text-2xl font-semibold py-7 rounded-t-xl text-white ">
          <div className="w-1/12"></div>
          <div className=" w-10/12 flex justify-center items-center">
            <p>Create New Event</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/events">
              <button
                // onClick={openAlert}
                className="bg-red-600 rounded-lg py-2 px-5 text-xl"
              >
                X
              </button>
            </a>
          </div>
        </div>
        <form onSubmit={addData}>
          <div className="">
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Image Banner</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  type="file"
                  required
                  onChange={(event) => handleUpload(event.target.files[0])}
                />
                <p className="text-red-600 pt-2">Image Ratio: 16:9 </p>
                <p className="text-red-600 pt-2">
                  minimum image resolution: 1920 x 1080 pixel{" "}
                </p>
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Title</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Title
                  <span className="text-red-600"> English</span> :
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTitleIng(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Quota
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setQuota(e.target.value)}
                  type="number"
                  required
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>

            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Location</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>

            {/* location */}
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>Loc :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Location"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Duration</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>From :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={dateFrom}
                  type="date"
                  required
                  placeholder="Insert Duration"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>To :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={dateTo}
                  type="date"
                  required
                  placeholder="Insert Duration"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Time</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>From :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTimeFrom(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Duration"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>To :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTimeTo(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Duration"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>

            {/* Fee */}
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Fee</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>Rupiah :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setFeeRupiah(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert fee"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>

            <div className=" flex py-1 ps-24 pt-32 ">
              <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
                <p>Main Description:</p>
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Description
                  <span className="text-red-600"> English</span> :
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <ReactQuill
                  modules={modules}
                  format={formats}
                  onChange={(e) => setDesIng(e)}
                  name="contentIng"
                  placeholder={`Input Description English For Description ${1}`}
                  maxLength={1000}
                  className="h-[200px] w-full   "
                />
              </div>
            </div>

            <div className=" flex py-1 px-20 ">
              <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
                <p>Content</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            {data.map((val, i) => {
              return (
                <div key={i}>
                  <div className=" flex py-1 px-20 ">
                    <div className=" w-2/12 text-end px-3 text-2xl font-bold pt-5 text-blue-600">
                      <p>{i + 1}</p>
                    </div>
                    <div className=" w-10/12 "></div>
                  </div>
                  <div className=" flex py-1 px-20 ">
                    <div className=" w-2/12 text-end p-3 py-5">
                      <p>
                        Topic
                        <span className="text-red-600"> English</span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <textarea
                        name="topicIng"
                        required
                        value={val.topicIng}
                        onChange={(e) => handleChange(e, i)}
                        id=""
                        cols="20"
                        rows="1"
                        placeholder={`Input Topic English For Description ${i + 1
                          }`}
                        color=" bg-transparent"
                        className=" w-full resize-none rounded-lg border-slate-300 "
                        maxLength={1000}
                      ></textarea>
                    </div>
                  </div>

                  <div className=" flex py-1 px-20 ">
                    <div className=" w-2/12 text-end p-3 py-5">
                      <p>
                        Description
                        <span className="text-red-600"> English</span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <ReactQuill
                        modules={modules}
                        format={formats}
                        theme="snow"
                        value={val.contentIng}
                        onChange={(e) =>
                          handleChange(
                            {
                              target: { value: e, name: "contentIng" },
                            },
                            i
                          )
                        }
                        name="contentIng"
                        placeholder={`Input Description English For Description ${i + 1
                          }`}
                        maxLength={2000}
                        className="h-[200px] "
                      />
                    </div>
                  </div>

                  <div className=" w-10/12 p-3 ps-72">
                    {val.img.map((vall, ii) => {
                      return (
                        <div className="flex" key={ii}>
                          <input
                            type="file"
                            name="img"
                            onChange={(event) =>
                              handleUpload2(event.target.files[0], event, i, ii)
                            }
                          />
                          {val.img.length !== 1 && (
                            <div className="w-32 mt-5 bg-red-700 text-center rounded-sm text-white">
                              <button
                                type="button"
                                onClick={(e) => handleDeleteImg(i, ii)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div className="flex justify-center items-center gap-10 mb-20">
                      <div className="w-32 bg-blue-950 text-center rounded-xl text-white ">
                        <button
                          type="button"
                          onClick={() => {
                            handleClickImg(i);
                            console.log(data);
                          }}
                          className="font-light"
                        >
                          Add More
                        </button>
                      </div>
                    </div>

                    {data.length !== 1 && (
                      <div className="w-32 mt-5 bg-red-700 text-center rounded-sm text-white">
                        <button type="button" onClick={(e) => handleDelete(i)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* <p>{JSON.stringify(data)}</p> */}
            <div className="flex justify-center items-center gap-10 mb-20">
              <div className="w-32 bg-blue-950 text-center rounded-xl text-white ">
                <button
                  type="button"
                  onClick={handleClick}
                  className="font-light"
                >
                  Add More
                </button>
              </div>
            </div>
            {/* <button onClick={handleClick}>Add More</button> */}

            <div className="mx-20">
              <div className=" flex items-end justify-end mx-3">
                {loading ? (
                  <p>Loading</p>
                ) : (
                  <button
                    type="submit"
                    className="p-3 px-7  rounded-lg mb-5 text-white bg-green-400"
                  >
                    Create New Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;

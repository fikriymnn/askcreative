"use client";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  getDoc,
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
import { db, storage } from "../../../../../firebase/page";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";

function EditEvent() {
  const [isAlert, setIsAlert] = useState(false);
  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };

  const searchParams = useSearchParams();
  const [titleIng, setTitleIng] = useState("");
  
  const [location, setLocation] = useState("");
  const [feeRupiah, setFeeRupiah] = useState("");
  
  const [durationFrom, setDurationFrom] = useState("");
  const [durationTo, setDurationTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [desIng, setDesIng] = useState("");
  const [roles, setRoles] = useState("");

  const [parsedDateFrom, setParsedDateFrom] = useState("");
  const [parsedDateTo, setParsedDateTo] = useState("");

  const [data, setData] = useState([
    {
      topicIng: "",
      topicChi: "",
      contentIng: "",
      contentChi: "",
      img: [{ img: "" }],
    },
  ]);

  const [dataOption, setDataOption] = useState([{ option: "", price: "" }]);

  const [downloadURL, setDownloadURL] = useState("");
  const [file, setFile] = useState("");
 const [quota, setQuota] = useState();
  const id = searchParams.get("id");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataEvents(id);
  }, [id]);

  const getDataEvents = async (idd) => {
    try {
      const docRef = doc(db, "events", idd);
      const querySnapshot = await getDoc(docRef);

      let data = [];

      data.push(querySnapshot.data());

      setTitleIng(data[0].titleEnglish);
      
      setData(data[0].content);
      setParsedDateFrom(data[0].durationFrom);
      setParsedDateTo(data[0].durationTo);
      setDurationFrom(data[0].durationFromValue);
      setDurationTo(data[0].durationToValue);
      setTimeFrom(data[0].timeFrom);
      setTimeTo(data[0].timeTo);
      setQuota(data[0].quota);
      setDesIng(data[0].descriptionEnglish);
      setLocation(data[0].location);
      setFeeRupiah(data[0].feeRupiah);
      setRole(data[0].roles);
      
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      setFile(files.name);
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
    const todoRef = doc(db, "events", id);

    if (file == "") {
      await updateDoc(todoRef, {
        titleEnglish: titleIng,
        
        durationFrom: parsedDateFrom,
        durationTo: parsedDateTo,
        durationFromValue: durationFrom,
        durationToValue: durationTo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        descriptionEnglish: desIng,
        quota:quota,
        content: data,
        location: location,
        feeRupiah: feeRupiah,
        roles:role,
        
      });
    } else {
      await updateDoc(todoRef, {
        titleEnglish: titleIng,
        
        durationFrom: parsedDateFrom,
        durationTo: parsedDateTo,
        durationFromValue: durationFrom,
        durationToValue: durationTo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        descriptionEnglish: desIng,
        quota:quota,
        img: downloadURL,
        content: data,
        location: location,
        feeRupiah: feeRupiah,
        roles:role,
        
      });
    }

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
  const handleClick = () => {
    setData([
      ...data,
      {
        topicIng: "",
       
        contentIng: "",
       
        img: [{ img: "" }],
      },
    ]);
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

  const handleClickOption = () => {
    setDataOption([...dataOption, { option: "", price: "" }]);
  };
  const handleChangeOption = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...dataOption];
    onchangeVal[i][name] = value;
    setDataOption(onchangeVal);
  };
  const handleDeleteOption = (i) => {
    const deleteVal = [...dataOption];
    deleteVal.splice(i, 1);
    setDataOption(deleteVal);
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
   const [role, setRole] = useState([{ header: '' }]);

  const handleChanger = (e, index) => {
    const { name, value } = e.target;
    const newRole = [...role];
    newRole[index][name] = value;
    setRole(newRole);
  };

  const handleClickr = () => {
    setRole([...role, { header: '' }]);
  };

  const handleDeleter = (index) => {
    const newRole = role.filter((_, i) => i !== index);
    setRole(newRole);
  };
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
            <p>Edit Event</p>
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
                <p className="text-red-600 pt-2">Image Ratio: 1:1 </p>
                <p className="text-red-600 pt-2">
                  minimum image resolution: 1080 x 1080 pixel{" "}
                </p>
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Details</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Title:
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTitleIng(e.target.value)}
                  type="text"
                  value={titleIng}
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
                  value={quota}
                  required
                  placeholder="Insert Quota"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>

            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>Location :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  value={location}
                  required
                  placeholder="Insert Location"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>Fee : </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setFeeRupiah(e.target.value)}
                  type="text"
                  value={feeRupiah}
                  required
                  placeholder="Insert fee"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Description:
                </p>
              </div>
              <div className=" w-10/12 p-3 mb-5">
                <ReactQuill
                value={desIng}
                  modules={modules}
                  format={formats}
                  onChange={(e) => setDesIng(e)}
                  name="contentIng"
                  placeholder={`Input Description English For Description ${1}`}
                  maxLength={1000}
                  className="h-[150px] w-full   "
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
                value={durationFrom}
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
                value={durationTo}
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
                value={timeFrom}
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
                value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Duration"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
             <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Participant </p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            {role.map((val, i) => (
        <div key={i} className="px-20">
          <div className="flex py-1 gap-2">
            <div className="w-2/12 text-end  text-2xl font-bold text-blue-600">
              <p>{i + 1}</p>
            </div>
            <div className="w-10/12 flex">
              <input
                type="text"
                name="header"
                value={val.header}
                onChange={(e) => handleChanger(e, i)}
                placeholder={`Participant role ${i + 1} ex: Mahasiswa`}
                className="w-full  border rounded-lg "
                />
                </div>
              {role.length !== 1 && (
                <div className="  text-center rounded-sm text-white">
                  <button
                    type="button"
                    onClick={() => handleDeleter(i)}
                    className="font-light bg-red-700 h-full rounded-md px-3"
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
      ))}
            <div className=" flex py-1 px-20 ">
              <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
                <p>Content</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div>



      
      <div className="flex justify-center items-center gap-10 mb-20">
        <div className="w-32 bg-blue-950 text-center rounded-xl text-white">
          <button
            type="button"
            onClick={handleClickr}
            className="font-light"
          >
            Add Role
          </button>
        </div>
      </div>
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
                        Header:
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
                        placeholder={`Input Header ${i + 1
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
                        Content:
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
                        placeholder={`Input Content ${i + 1
                          }`}
                        maxLength={2000}
                        className="h-[200px] mb-5 "
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
                    <div className="flex justify-start items-center gap-10 mb-20">
                      <div className="px-3 bg-blue-950 text-center rounded-sm text-white mt-2">
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
                  Add Content Section
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
                    onClick={addData}
                    className="p-3 px-7  rounded-lg mb-5 text-white bg-green-400"
                  >
                    Edit Event
                  </button>
                )}
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default EditEvent;

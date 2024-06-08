"use client";
import React from "react";

import { useState, useEffect, useMemo } from "react";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../../../../firebase/page";
import DropdownDef1 from "@/components/dropdownDef";
import DropdownDef2 from "@/components/dropdownDef2";
import { Dropdown } from "flowbite-react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/components/admin/editor.css";
function CreateService() {
  const [isAlert, setIsAlert] = useState(false);
  const [titleIng, setTitleIng] = useState("");
  const [titleChi, setTitleChi] = useState("");
  const [desIng, setDesIng] = useState("");
  const [desChi, setDesChi] = useState("");

  const [service, setService] = useState("");
  const [subService, setSubService] = useState("");

  const [data, setData] = useState([
    {
      topicIng: "",
      topicChi: "",
      contentIng: "",
      contentChi: "",
      img: [{ img: "" }],
    },
  ]);

  const [dataOption, setDataOption] = useState([
    { option: "", priceYuan: "", priceRupiah: "" },
  ]);

  const [downloadURL, setDownloadURL] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/service/${files.name}`);

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
      const storageRef = ref(storage, `/service/${files.name}`);

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
    const docRef = await addDoc(collection(db, "service"), {
      content: data,
      descriptionEnglish: desIng,
      descriptionChinese: desChi,
      date: date,
      createdAt: today,
      img: downloadURL,

      price: dataOption,

      service: service,
      subService: subService,
      titleChinese: titleChi,
      titleEnglish: titleIng,
    });

    alert("success");
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
        topicChi: "",
        contentIng: "",
        contentChi: "",
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
    setDataOption([
      ...dataOption,
      { option: "", priceYuan: "", priceRupiah: "" },
    ]);
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

  let Drop;

  if (service == "Basic Establishment Services") {
    Drop = (
      <>
        <div className="flex items-start justify-start">
          <div className="grid grid-cols-1">
            <button
              type="button"
              onClick={() => setSubService("Company Registration")}
            >
              <div className="p-2">Company Registration</div>
            </button>
            <button
              type="button"
              onClick={() => setSubService("Visa Registration")}
            >
              <div className="p-2">Visa Registration</div>
            </button>
            <button type="button" onClick={() => setSubService("Trademark")}>
              <div className="p-2">Trademark</div>
            </button>
            <button
              type="button"
              onClick={() => setSubService("Office Administration")}
            >
              <div className="p-2">Office Administration</div>
            </button>
            <button
              type="button"
              onClick={() => setSubService("Construction Certifications")}
            >
              <div className="p-2">Construction Certifications</div>
            </button>
            <button
              type="button"
              onClick={() => setSubService("Factory Licenses")}
            >
              <div className="p-2">Factory Licenses</div>
            </button>
          </div>
        </div>
      </>
    );
  } else if (service == "Product Certifications") {
    Drop = (
      <div className="flex items-start justify-start">
        <div className="grid grid-cols-1">
          <button
            type="button"
            onClick={() => setSubService("BPOM Food and Drug")}
          >
            <div className="p-2">BPOM Food and Drug</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("ISO Management System")}
          >
            <div className="p-2">ISO Management System</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("SNI National Standard")}
          >
            <div className="p-2">SNI National Standard</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Medical and Hygiene")}
          >
            <div className="p-2">Medical and Hygiene</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("POSTEL Telecommunication")}
          >
            <div className="p-2">POSTEL Telecommunication</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Alcohol and Cigarette")}
          >
            <div className="p-2">Alcohol and Cigarette</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Other Certification")}
          >
            <div className="p-2">Other Certification</div>
          </button>
        </div>
      </div>
    );
    // button = <LoginButton onClick={this.handleLoginClick} />;
  } else if (service == "Finance Accounting Tax") {
    Drop = (
      <div className="flex items-start justify-start">
        <div className="grid grid-cols-1">
          <button
            type="button"
            onClick={() => setSubService("Finance Services")}
          >
            <div className="p-2">Finance Services</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Accounting Services")}
          >
            <div className="p-2">Accounting Services</div>
          </button>
          <button type="button" onClick={() => setSubService("Tax Services")}>
            <div className="p-2">Tax Services</div>
          </button>
        </div>
      </div>
    );
    // button = <LoginButton onClick={this.handleLoginClick} />;
  } else if (service == "Talent Recruitment HR") {
    Drop = (
      <div className="flex items-start justify-start">
        <div className="grid grid-cols-1">
          <button
            type="button"
            onClick={() => setSubService("Translator Assistant")}
          >
            <div className="p-2">Translator Assistant</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Finance Accounting Tax")}
          >
            <div className="p-2">Finance Accounting Tax</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Marketing Sales")}
          >
            <div className="p-2">Marketing Sales</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("Management Candidate")}
          >
            <div className="p-2">Management Candidate</div>
          </button>
          <button
            type="button"
            onClick={() => setSubService("HR Management Service")}
          >
            <div className="p-2">HR Management Service</div>
          </button>
        </div>
      </div>
    );
    // button = <LoginButton onClick={this.handleLoginClick} />;
  } else if (service == "Legal Services") {
    Drop = (
      <div className="flex items-start justify-start">
        <div className="grid grid-cols-1">
          <button
            type="button"
            onClick={() => setSubService("Legal Administration")}
          >
            <div className="p-2">Legal Administration</div>
          </button>
        </div>
      </div>
    );
    // button = <LoginButton onClick={this.handleLoginClick} />;
  }

  return (
    <>
      {isAlert && (
        <div className="bgtr w-screen h-screen fixed top-0 flex items-center justify-center gap-5 z-50">
          <div className="flex-col">
            <div className=" text-2xl mb-5">Change Will not be saved</div>
            <div className="flex justify-between">
              <a href="/dashboardAdmin/services">
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
            <p>Create New Service</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/services">
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
                <p className="text-red-600 pt-2">image ratio: 16:9 </p>
                <p className="text-red-600 pt-2">
                  minimum image resolution: 1920 x 1080 pixel{" "}
                </p>
              </div>
              {loading ? <p>Loading</p> : <></>}
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
                  {" "}
                  Title <span className="text-red-600">English :</span>
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  type="text"
                  required
                  onChange={(e) => setTitleIng(e.target.value)}
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Title <span className="text-red-600">Chinese </span> :
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  type="text"
                  required
                  onChange={(e) => setTitleChi(e.target.value)}
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>

            <div className=" flex py-5 px-20 ">
              <div className=" w-3/12 text-end px-3 text-2xl font-semibold pt-5">
                <p>Price Option</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>

            {dataOption.length > 0 &&
              dataOption.map((val, i) => {
                return (
                  <div key={i}>
                    <div className=" flex py-1 px-20 ">
                      <div className=" w-2/12 text-end p-3 py-5">
                        <p>Option :</p>
                      </div>
                      <div className=" w-10/12 p-3">
                        <input
                          type="text"
                          required
                          name="option"
                          value={val.option}
                          onChange={(e) => handleChangeOption(e, i)}
                          placeholder={`Option ${i + 1}`}
                          color=" bg-transparent"
                          className=" rounded-lg w-full border-slate-300 "
                        />
                      </div>
                    </div>
                    <div className=" flex flex-col py-1 px-20">
                      <div className="flex">
                        <div className=" w-2/12 text-end p-3 py-5">
                          <p>
                            Input Price{" "}
                            <span className="text-red-600">Yuan</span> :
                          </p>
                        </div>
                        <div className=" w-10/12 p-3">
                          <input
                            type="text"
                            required
                            name="priceYuan"
                            value={val.priceYuan}
                            onChange={(e) => handleChangeOption(e, i)}
                            placeholder={`Input Price 元 for option ${i + 1}`}
                            color=" bg-transparent"
                            className=" rounded-lg w-full border-slate-300 "
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className=" w-2/12 text-end p-3 py-5">
                          <p>
                            Input Price{" "}
                            <span className="text-red-600">Rupiah</span> :
                          </p>
                        </div>
                        <div className=" w-10/12 p-3">
                          <input
                            type="text"
                            name="priceRupiah"
                            required
                            value={val.priceRupiah}
                            onChange={(e) => handleChangeOption(e, i)}
                            placeholder={`Input Price Rp for option ${i + 1}`}
                            color=" bg-transparent"
                            className=" rounded-lg w-full border-slate-300 "
                          />
                          {dataOption.length !== 1 && (
                            <div className="w-32 mt-5 bg-red-700 text-center rounded-sm text-white">
                              <button
                                type="button"
                                onClick={(e) => handleDeleteOption(i)}
                              >
                                Delete option
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="flex justify-center items-center gap-10 mb-20">
              <div className="w-32 bg-blue-950 text-center rounded-xl text-white ">
                <button
                  type="button"
                  onClick={handleClickOption}
                  className="font-light"
                >
                  Add Option
                </button>
              </div>
            </div>
            {/* <p>{JSON.stringify(dataOption)}</p> */}

            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 "></div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 justify-center items-center">
              <div className=" w-2/12 text-end p-3 py-3 text-2xl font-semibold">
                <p>Service</p>
              </div>
              <div className=" w-10/12 p-3 flex gap-3">
                <Dropdown
                  required
                  className="bg-white"
                  label={service == "" ? "Categories" : service}
                >
                  <div className="grid grid-cols-1 ">
                    <button
                      type="button"
                      onClick={() => {
                        setService("Basic Establishment Services");
                        setSubService("");
                      }}
                    >
                      <div className="p-2">Basic Establishment Services</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setService("Product Certifications");
                        setSubService("");
                      }}
                    >
                      <div className="p-2">Product Certifications</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setService("Finance Accounting Tax");
                        setSubService("");
                      }}
                    >
                      <div className="p-2"> Finance Accounting Tax</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setService("Talent Recruitment HR");
                        setSubService("");
                      }}
                    >
                      <div className="p-2"> Talent Recruitment HR</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setService("Legal Services");
                        setSubService("");
                      }}
                    >
                      <div className="p-2">Legal Services</div>
                    </button>
                  </div>
                </Dropdown>
                <Dropdown
                  required
                  label={subService == "" ? "Sub Categories" : subService}
                >
                  {Drop}
                </Dropdown>
              </div>
            </div>
            <div className=" flex py-1 ps-40 pt-32 ">
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
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Description
                  <span className="text-red-600"> Chinese</span> :
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <ReactQuill
                  modules={modules}
                  format={formats}
                  onChange={(e) => setDesChi(e)}
                  name="contentChi"
                  placeholder={`Input Description Mandarin For Description ${1}`}
                  maxLength={1000}
                  className="h-[200px] my-10 "
                />
              </div>
            </div>
            <div className=" flex py-1 ps-40 pt-32 ">
              <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
                <p>Content</p>
              </div>
            </div>
            {data.length > 0 &&
              data.map((val, i) => {
                return (
                  <div key={val.id}>
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
                          placeholder={`Input Topic English For Description ${
                            i + 1
                          }`}
                          color=" bg-transparent"
                          className=" w-full resize-none rounded-lg border-slate-300 "
                          maxLength={1000}
                        ></textarea>
                      </div>
                    </div>
                    <div className=" flex py-1 px-20">
                      <div className=" w-2/12 text-end p-3 py-5">
                        <p>
                          Topic
                          <span className="text-red-600"> Chinese</span> :
                        </p>
                      </div>
                      <div className=" w-10/12 p-3">
                        <textarea
                          name="topicChi"
                          required
                          value={val.topicChi}
                          onChange={(e) => handleChange(e, i)}
                          id=""
                          cols="20"
                          rows="1"
                          placeholder={`Input Topic Chinese For Description ${
                            i + 1
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
                          placeholder={`Input Description english For Description ${
                            i + 1
                          }`}
                          maxLength={1000}
                          className="h-[200px] w-full   "
                        />
                      </div>
                    </div>
                    <div className=" flex py-1 px-20">
                      <div className=" w-2/12 text-end p-3 py-5">
                        <p>
                          Description
                          <span className="text-red-600"> Chinese</span> :
                        </p>
                      </div>
                      <div className=" w-10/12 p-3">
                        <ReactQuill
                          modules={modules}
                          format={formats}
                          value={val.contentChi}
                          onChange={(e) =>
                            handleChange(
                              {
                                target: { value: e, name: "contentChi" },
                              },
                              i
                            )
                          }
                          name="contentChi"
                          placeholder={`Input Description Chinese For Description ${
                            i + 1
                          }`}
                          maxLength={1000}
                          className="h-[200px] my-10 "
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
                                handleUpload2(
                                  event.target.files[0],
                                  event,
                                  i,
                                  ii
                                )
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
                          <button
                            type="button"
                            onClick={(e) => handleDelete(i)}
                          >
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

            <div className="mx-20">
              <div className=" flex items-end justify-end mx-3">
                {loading ? (
                  <p>Loading</p>
                ) : (
                  <button
                    type="submit"
                    className="p-3 px-7  rounded-lg mb-5 text-white bg-green-400"
                  >
                    Create New Service
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

export default CreateService;

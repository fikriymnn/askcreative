"use client";
import React from "react";
import { Dropdown } from "flowbite-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
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
import "@/components/admin/editor.css";
function CreatePolicies() {
  const [isAlert, setIsAlert] = useState(false);
  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };

  const [titleIng, setTitleIng] = useState("");
  const [titleChi, setTitleChi] = useState("");
  const [category, setCategory] = useState("");
  const [subCategoryIng, setSubCategoryIng] = useState("");
  const [subCategoryChi, setSubCategoryChi] = useState("");
  const [desIng, setDesIng] = useState("");
  const [desChi, setDesChi] = useState("");

  const [downloadURL, setDownloadURL] = useState("");
  const [data, setData] = useState([
    {
      topicIng: "",
      topicChi: "",
      contentIng: "",
      contentChi: "",
      img: [{ img: "" }],
    },
  ]);

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/policies/${files.name}`);

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
      const storageRef = ref(storage, `/policies/${files.name}`);

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
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const docRef = await addDoc(collection(db, "policies"), {
      titleEnglish: titleIng,
      titleChinese: titleChi,
      category: category,
      subCategoryEnglish: subCategoryIng,
      subCategoryChinese: subCategoryChi,
      descriptionEnglish: desIng,
      descriptionChinese: desChi,

      img: downloadURL,
      date: date,
      content: data,
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
              <a href="/dashboardAdmin/policies">
                <button
                  type="button"
                  className="p-3 px-7 hover:bg-blue-500 rounded-lg mb-5 text-white bg-red-700"
                >
                  Oke
                </button>
              </a>
              <button
                type="button"
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
            <p>Create New Policies and Regulations</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/policies">
              <button
                type="button"
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
                <p>Image</p>
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
                <p>English :</p>
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
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>Chinese :</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTitleChi(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>

            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 "></div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5 text-2xl font-semibold">
                <p>Category</p>
              </div>
              <div className=" w-10/12 p-3 flex gap-3">
                <Dropdown
                  className="bg-white"
                  label={category == "" ? "Categories" : category}
                >
                  <div className="grid grid-cols-1 ">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("Foreign Company Registration");
                      }}
                    >
                      <div className="p-2">Foreign Company Registration</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("Tax Regulation");
                      }}
                    >
                      <div className="p-2">Tax Regulation</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("Labor Policy");
                      }}
                    >
                      <div className="p-2">Labor Policy</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("Import Export Procedures & Policies");
                      }}
                    >
                      <div className="p-2">
                        Import Export Procedures & Policies
                      </div>
                    </button>
                  </div>
                </Dropdown>

                {/* <input
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="This will be a Dropdown"
                color=" bg-transparent"
                className=" rounded-lg w-full border-slate-300 "
              /> */}
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5 text-2xl font-semibold">
                <p> Sub Category</p>
              </div>
              <div className=" w-10/12 p-3 flex gap-3">
                <input
                  onChange={(e) => setSubCategoryIng(e.target.value)}
                  type="text"
                  required
                  placeholder="Sub category english"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
                <input
                  onChange={(e) => setSubCategoryChi(e.target.value)}
                  type="text"
                  required
                  placeholder="Sub category chinese"
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
            <div className=" flex py-1 px-20 ">
              <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
                <p>Content</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            {data.map((val, i) => {
              return (
                <>
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
                      {" "}
                      <p>
                        Topic
                        <span className="text-red-600"> Chinese</span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <textarea
                        name="topicChi"
                        value={val.topicChi}
                        required
                        onChange={(e) => handleChange(e, i)}
                        id=""
                        cols="20"
                        rows="1"
                        placeholder={`Input Topic Mandarin For Description ${
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
                        placeholder={`Input Description English For Description ${
                          i + 1
                        }`}
                        maxLength={2000}
                        className="h-[200px] "
                      />
                    </div>
                  </div>
                  <div className=" flex py-1 px-20">
                    <div className=" w-2/12 text-end p-3 py-5">
                      {" "}
                      <p>
                        Description
                        <span className="text-red-600"> Chinese</span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <ReactQuill
                        modules={modules}
                        format={formats}
                        theme="snow"
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
                        placeholder={`Input Description Mandarin For Description ${
                          i + 1
                        }`}
                        maxLength={2000}
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
                </>
              );
            })}
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
                    Create New Policies and Regulations
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

export default CreatePolicies;

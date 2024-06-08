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
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { db, storage } from "../../../../../firebase/page";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DropdownDef1 from "@/components/dropdownDef";
import DropdownDef2 from "@/components/dropdownDef2";
import { Dropdown } from "flowbite-react";
import "@/components/admin/editor.css";
function EditService() {
  const [isAlert, setIsAlert] = useState(false);
  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };
  const searchParams = useSearchParams();
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
  const [file, setFile] = useState("");

  const id = searchParams.get("id");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataService(id);
  }, [id]);

  const getDataService = async (idd) => {
    try {
      const docRef = doc(db, "service", idd);
      const querySnapshot = await getDoc(docRef);

      // if (querySnapshot.exists()) {
      //   console.log("Document data:", querySnapshot.data());
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }
      let data = [];

      // doc.data() is never undefined for query doc snapshots

      data.push(querySnapshot.data());

      setTitleIng(data[0].titleEnglish);
      setTitleChi(data[0].titleChinese);
      setData(data[0].content);
      setDataOption(data[0].price);
      setService(data[0].service);
      setSubService(data[0].subService);
      setDesChi(data[0].descriptionChinese);
      setDesIng(data[0].descriptionEnglish);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      setFile(files.name);
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

  const handleUpload2 = async (filess, e, i) => {
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
    const todoRef = doc(db, "service", id);

    if (file == "") {
      await updateDoc(todoRef, {
        service: service,
        subService: subService,
        titleChinese: titleChi,
        titleEnglish: titleIng,
        content: data,
        price: dataOption,
        descriptionEnglish: desIng,
        descriptionChinese: desChi,
      });
    } else {
      await updateDoc(todoRef, {
        img: downloadURL,
        content: data,
        price: dataOption,

        service: service,
        subService: subService,
        titleChinese: titleChi,
        titleEnglish: titleIng,
        descriptionEnglish: desIng,
        descriptionChinese: desChi,
      });
    }

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
            <button onClick={() => setSubService("Company Registration")}>
              <div className="p-2">Company Registration</div>
            </button>
            <button onClick={() => setSubService("Visa Registration")}>
              <div className="p-2">Visa Registration</div>
            </button>
            <button onClick={() => setSubService("Trademark")}>
              <div className="p-2">Trademark</div>
            </button>
            <button onClick={() => setSubService("Office Administration")}>
              <div className="p-2">Office Administration</div>
            </button>
            <button
              onClick={() => setSubService("Construction Certifications")}
            >
              <div className="p-2">Construction Certifications</div>
            </button>
            <button onClick={() => setSubService("Factory Licenses")}>
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
          <button onClick={() => setSubService("BPOM Food and Drug")}>
            <div className="p-2">BPOM Food and Drug</div>
          </button>
          <button onClick={() => setSubService("ISO Management System")}>
            <div className="p-2">ISO Management System</div>
          </button>
          <button onClick={() => setSubService("SNI National Standard")}>
            <div className="p-2">SNI National Standard</div>
          </button>
          <button onClick={() => setSubService("Medical and Hygiene")}>
            <div className="p-2">Medical and Hygiene</div>
          </button>
          <button onClick={() => setSubService("POSTEL Telecommunication")}>
            <div className="p-2">POSTEL Telecommunication</div>
          </button>
          <button onClick={() => setSubService("Alcohol and Cigarette")}>
            <div className="p-2">Alcohol and Cigarette</div>
          </button>
          <button onClick={() => setSubService("Other Certification")}>
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
          <button onClick={() => setSubService("Finance Services")}>
            <div className="p-2">Finance Services</div>
          </button>
          <button onClick={() => setSubService("Accounting Services")}>
            <div className="p-2">Accounting Services</div>
          </button>
          <button onClick={() => setSubService("Tax Services")}>
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
          <button onClick={() => setSubService("Translator Assistant")}>
            <div className="p-2">Translator Assistant</div>
          </button>
          <button onClick={() => setSubService("Finance Accounting Tax")}>
            <div className="p-2">Finance Accounting Tax</div>
          </button>
          <button onClick={() => setSubService("Marketing Sales")}>
            <div className="p-2">Marketing Sales</div>
          </button>
          <button onClick={() => setSubService("Management Candidate")}>
            <div className="p-2">Management Candidate</div>
          </button>
          <button onClick={() => setSubService("HR Management Service")}>
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
          <button onClick={() => setSubService("Legal Administration")}>
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
            <p>Edit Service</p>
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

        <div className=" ">
          <div className=" flex py-1 px-20 ">
            <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
              <p>Image Banner</p>
            </div>
            <div className=" w-10/12 p-3">
              <input
                type="file"
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
              <p>English :</p>
            </div>
            <div className=" w-10/12 p-3">
              <input
                type="text"
                value={titleIng ?? ""}
                onChange={(e) => setTitleIng(e.target.value)}
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
                type="text"
                value={titleChi ?? ""}
                onChange={(e) => setTitleChi(e.target.value)}
                placeholder="Insert Title"
                color=" bg-transparent"
                className=" rounded-lg w-full border-slate-300 "
              />
            </div>
          </div>

          <div className=" flex py-1 px-20 ">
            <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
              <p>Option</p>
            </div>
            <div className=" w-10/12 "></div>
          </div>

          {dataOption.map((val, i) => {
            return (
              <>
                <div className=" flex py-1 px-20 ">
                  <div className=" w-2/12 text-end p-3 py-5">
                    <p>Option :</p>
                  </div>
                  <div className=" w-10/12 p-3">
                    <input
                      type="text"
                      name="option"
                      value={val.option}
                      onChange={(e) => handleChangeOption(e, i)}
                      placeholder={`Option ${i + 1}`}
                      color=" bg-transparent"
                      className=" rounded-lg w-full border-slate-300 "
                    />
                  </div>
                </div>
                <div className=" flex py-1 px-20">
                  <div className=" w-2/12 text-end p-3 py-5">
                    <p>
                      Input Price
                      <span className="text-red-600"> Yuan</span> :
                    </p>
                  </div>
                  <div className=" w-10/12 p-3">
                    <input
                      type="text"
                      name="priceYuan"
                      value={val.priceYuan}
                      onChange={(e) => handleChangeOption(e, i)}
                      placeholder={`Input Price 元 for option ${i + 1}`}
                      color=" bg-transparent"
                      className=" rounded-lg w-full border-slate-300 "
                    />
                  </div>
                </div>
                <div className=" flex py-1 px-20">
                  <div className=" w-2/12 text-end p-3 py-5">
                    <p>
                      Input Price
                      <span className="text-red-600"> Yuan</span> :
                    </p>
                  </div>
                  <div className=" w-10/12 p-3">
                    <input
                      type="text"
                      name="priceRupiah"
                      value={val.priceRupiah}
                      onChange={(e) => handleChangeOption(e, i)}
                      placeholder={`Input Price Rp for option ${i + 1}`}
                      color=" bg-transparent"
                      className=" rounded-lg w-full border-slate-300 "
                    />
                    {dataOption.length !== 1 && (
                      <div className="w-32 mt-5 bg-red-700 text-center rounded-sm text-white">
                        <button onClick={(e) => handleDeleteOption(i)}>
                          Delete option
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}

          {/* <p>{JSON.stringify(dataOption)}</p> */}
          <div className="flex justify-center items-center gap-10 mb-20">
            <div className="w-32 bg-blue-950 text-center rounded-xl text-white ">
              <button onClick={handleClickOption} className="font-light">
                Add Option
              </button>
            </div>
          </div>

          <div className=" flex py-1 px-20 ">
            <div className=" w-2/12 "></div>
            <div className=" w-10/12 "></div>
          </div>
          <div className=" flex py-1 px-20 ">
            <div className=" w-2/12 text-end p-3 py-5 text-2xl font-semibold">
              <p>Service</p>
            </div>
            <div className=" w-10/12 p-3 flex gap-3">
              <Dropdown
                className="bg-white"
                label={service == "" ? "Categories" : service}
              >
                <div className="grid grid-cols-1 ">
                  <button
                    onClick={() => {
                      setService("Basic Establishment Services");
                      setSubService("");
                    }}
                  >
                    <div className="p-2">Basic Establishment Services</div>
                  </button>

                  <button
                    onClick={() => {
                      setService("Product Certifications");
                      setSubService("");
                    }}
                  >
                    <div className="p-2">Product Certifications</div>
                  </button>
                  <button
                    onClick={() => {
                      setService("Finance Accounting Tax");
                      setSubService("");
                    }}
                  >
                    <div className="p-2"> Finance Accounting Tax</div>
                  </button>
                  <button
                    onClick={() => {
                      setService("Talent Recruitment HR");
                      setSubService("");
                    }}
                  >
                    <div className="p-2"> Talent Recruitment HR</div>
                  </button>
                  <button
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
                value={desIng}
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
                value={desChi}
                onChange={(e) => setDesChi(e)}
                name="contentChi"
                placeholder={`Input Description Mandarin For Description ${1}`}
                maxLength={1000}
                className="h-[200px] my-10 "
              />
            </div>
          </div>
          <div className=" flex py-1 ps-40 pt-32">
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
                      value={val.topicChi}
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
                      // onChange={(e) => handleChange(e, i)}
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
                      maxLength={1000}
                      className="h-[200px]  "
                    />
                    {/* <textarea
                      name="contentIng"
                      value={val.contentIng}
                      onChange={(e) => handleChange(e, i)}
                      id=""
                      cols="20"
                      rows="5"
                      placeholder={`Input Description English For Description ${i + 1
                        }`}
                      color=" bg-transparent"
                      className=" w-full resize-none rounded-lg border-slate-300 "
                      maxLength={1000}
                    ></textarea> */}
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
                      maxLength={1000}
                      className="h-[200px] my-10 "
                    />
                    {/* <textarea
                      name="contentChi"
                      value={val.contentChi}
                      onChange={(e) => handleChange(e, i)}
                      id=""
                      cols="20"
                      rows="5"
                      placeholder={`Input Description Mandarin For Description ${i + 1
                        }`}
                      color=" bg-transparent"
                      className=" w-full resize-none rounded-lg border-slate-300 "
                      maxLength={1000}
                    ></textarea> */}
                  </div>
                </div>
                <div className=" w-10/12 p-3   ps-72">
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
                      <button onClick={(e) => handleDelete(i)}>Delete</button>
                    </div>
                  )}
                </div>
                {/* {data.length !== 1 && (
                  <button onClick={(e) => handleDelete(i)}>
                    Delete option
                  </button> */}
              </>
            );
          })}
          {/* <p>{JSON.stringify(data)}</p>
          <button onClick={handleClick}>Add More</button> */}
          <div className="flex justify-center items-center gap-10 mb-20">
            <div className="w-32 bg-blue-950 text-center rounded-xl text-white ">
              <button onClick={handleClick} className="font-light">
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
                  onClick={(e) => addData(e)}
                  className="p-3 px-7  rounded-lg mb-5 text-white bg-green-400"
                >
                  Edit Service
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditService;

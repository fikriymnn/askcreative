"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
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
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/components/admin/editor.css";
function EditPackage() {
  const [isHidden, setIsHidden] = useState([]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };
  const searchParams = useSearchParams();

  const [dataService, setDataService] = useState([]);
  const [dataServiceResult, setDataServiceResult] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e);
    const results = dataService.filter(
      (item) => item.titleEnglish.toLowerCase().includes(search.toLowerCase())
      // : item.titleChinese.toLowerCase().includes(search.toLowerCase())
    );
    setDataServiceResult(results);
  };
  const id = searchParams.get("id");

  const [titleIng, setTitleIng] = useState("");
  const [titleChi, setTitleChi] = useState("");
  const [desIng, setDesIng] = useState("");
  const [desChi, setDesChi] = useState("");

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
  const [dataServiceId, setDataServiceId] = useState([
    { id: "", nameIng: "", nameChi: "", img: "", price: [] },
  ]);

  const [downloadURL, setDownloadURL] = useState("");
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };

  useEffect(() => {
    getDataService();
  }, []);

  useEffect(() => {
    getDataPackage(id);
  }, [id]);

  //get data about
  const getDataService = async () => {
    try {
      try {
        const querySnapshot = await getDocs(collection(db, "service"));
        let data = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        setDataService(data);
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  //get data about
  async function getDataPackage(idd) {
    try {
      const docRef = doc(db, "package", idd);
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
      setDataServiceId(data[0].services);
      setDesChi(data[0].descriptionChinese);
      setDesIng(data[0].descriptionEnglish);

      for (let i = 0; i < data[0].services.length; i++) {
        setIsHidden([...isHidden, false]);
      }
    } catch (error) {
      alert(error);
    }
  }

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      setFile(files.name);
      const storageRef = ref(storage, `/package/${files.name}`);

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
      const storageRef = ref(storage, `/package/${files.name}`);

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
    const todoRef = doc(db, "package", id);

    if (file == "") {
      await updateDoc(todoRef, {
        content: data,

        price: dataOption,
        services: dataServiceId,
        titleChinese: titleChi,
        titleEnglish: titleIng,
        descriptionEnglish: desIng,
        descriptionChinese: desChi,
      });
    } else {
      await updateDoc(todoRef, {
        content: data,
        img: downloadURL,
        price: dataOption,
        services: dataServiceId,
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
  const handleChangeHiden = (val, i) => {
    const onchangeVal = [...isHidden];

    onchangeVal[i] = val;
    setIsHidden(onchangeVal);
  };
  const handleClickService = () => {
    setDataServiceId([
      ...dataServiceId,
      { id: "", nameIng: "", nameChi: "", img: "", price: [] },
    ]);
    setIsHidden([...isHidden, false]);
  };
  const handleChangeService = (namee, val, i) => {
    const name = namee;
    const onchangeVal = [...dataServiceId];

    onchangeVal[i][name] = val;
    setDataServiceId(onchangeVal);
  };
  const handleDeleteService = (i) => {
    const deleteVal = [...dataServiceId];
    deleteVal.splice(i, 1);
    setDataServiceId(deleteVal);
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
  return (
    <>
      <div className="w-full z-40 rounded-xl border-[#007aff] border-2  top-0">
        <div className=" bg-[#007aff] flex  text-2xl font-semibold py-7 rounded-t-xl text-white ">
          <div className="w-1/12"></div>
          <div className=" w-10/12 flex justify-center items-center">
            <p>Edit Package</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/packages">
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
                onChange={(event) => handleUpload(event.target.files[0])}
              />
              <p className="text-red-600 pt-2">image ratio: 16:9 </p>
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
                value={titleIng}
                onChange={(e) => setTitleIng(e.target.value)}
                type="text"
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
                value={titleChi}
                onChange={(e) => setTitleChi(e.target.value)}
                type="text"
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
                      Input price
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
                      Input price
                      <span className="text-red-600"> Rupiah</span> :
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
          <div className="flex justify-center items-center gap-10 mb-20">
            <div className="w-32 bg-blue-950 text-center rounded-xl text-white ">
              <button onClick={handleClickOption} className="font-light">
                Add Option
              </button>
            </div>
          </div>
          {/* <p>{JSON.stringify(dataOption)}</p> */}

          {dataServiceId.map((val, ii) => {
            return (
              <>
                <div className=" flex py-1 px-20 ">
                  <div className=" w-2/12 "></div>
                  <div className=" w-10/12 "></div>
                </div>
                <div className=" flex py-1 px-20 justify-center items-center">
                  <div className=" w-2/12 text-end p-3 py-3 text-2xl font-semibold">
                    <p>Service</p>
                  </div>
                  <div className=" w-10/12 p-3 flex gap-3">
                    <button
                      onClick={() =>
                        handleChangeHiden(
                          isHidden[ii] == true ? false : true,
                          ii
                        )
                      }
                      className=" rounded-lg text-white px-10 p-3 bg-blue-700 border-slate-300 text-start"
                    >
                      {val.nameIng == "" ? "Add Service" : val.nameIng}
                    </button>
                  </div>
                </div>
                <div className=" px-32">
                  {isHidden[ii] == false ? null : (
                    <>
                      <div className="relative p-5 pt-10 bg-gray-400">
                        <div className="relative">
                          <input
                            type="text"
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search by title..."
                            className="w-full h-12 pl-4 pr-10 rounded-md border-none bg-gray-200 focus:outline-none !important"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.293 13.293a6 6 0 111.414-1.414l5 5a1 1 0 01-1.414 1.414l-5-5z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M10 16a6 6 0 100-12 6 6 0 000 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5 p-5 bg-slate-300 max-h-[400px] overflow-y-scroll  pb-10">
                        {search == ""
                          ? dataService.map((data, i) => {
                              return (
                                <>
                                  <button
                                    name="id"
                                    onClick={(e) => {
                                      handleChangeService("id", data.id, ii),
                                        handleChangeService(
                                          "nameIng",
                                          data.titleEnglish,
                                          ii
                                        );
                                      handleChangeService(
                                        "nameChi",
                                        data.titleChinese,
                                        ii
                                      );
                                      handleChangeService("img", data.img, ii);
                                      handleChangeService(
                                        "price",
                                        data.price,
                                        ii
                                      );
                                    }}
                                  >
                                    <div className="bg-white hover:bg-slate-200 flex">
                                      <img
                                        className="w-[80px] h-[80px]"
                                        src={data.img}
                                        alt=""
                                      />
                                      <div className="p-3">
                                        <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                          {data.titleEnglish}
                                        </h1>
                                        <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                          {data.price[0].priceYuan} 元
                                        </h2>
                                      </div>
                                    </div>
                                  </button>
                                </>
                              );
                            })
                          : dataServiceResult.map((data, i) => {
                              return (
                                <>
                                  <button
                                    name="id"
                                    onClick={(e) => {
                                      handleChangeService("id", data.id, ii),
                                        handleChangeService(
                                          "nameIng",
                                          data.titleEnglish,
                                          ii
                                        );
                                      handleChangeService(
                                        "nameChi",
                                        data.titleChinese,
                                        ii
                                      );
                                      handleChangeService("img", data.img, ii);
                                      handleChangeService(
                                        "price",
                                        data.price,
                                        ii
                                      );
                                    }}
                                  >
                                    <div className="bg-white hover:bg-slate-200 flex">
                                      <img
                                        className="w-[80px] h-[80px]"
                                        src={data.img}
                                        alt=""
                                      />
                                      <div className="p-3">
                                        <h1 className="font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 ">
                                          {data.titleEnglish}
                                        </h1>
                                        <h2 className="md:text-base sm:text-sm text-sm text-blue-600">
                                          {data.price[0].price} 元
                                        </h2>
                                      </div>
                                    </div>
                                  </button>
                                </>
                              );
                            })}
                      </div>
                    </>
                  )}
                  {dataServiceId.length !== 1 && (
                    <div className="w-32 mt-5 ms-40 bg-red-700 text-center rounded-sm text-white">
                      <button onClick={(e) => handleDeleteService(ii)}>
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
              <button onClick={handleClickService} className="font-light">
                Add Service
              </button>
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
          <div className=" flex py-1 ps-40 pt-32 ">
            <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
              <p>Content</p>
            </div>
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
                      placeholder={`Input Description Mandarin For Description ${
                        i + 1
                      }`}
                      maxLength={1000}
                      className="h-[200px] w-full   "
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
                      <button onClick={(e) => handleDelete(i)}>Delete</button>
                    </div>
                  )}
                </div>
              </>
            );
          })}
          {/* <p>{JSON.stringify(data)}</p> */}
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
                  Edit Package
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPackage;

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
import Quilltext from "@/components/admin/quilltext";
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

function EditArticle() {
  const [isAlert, setIsAlert] = useState(false);
  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };
  const searchParams = useSearchParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  
  const [des, setDes] = useState("");
  

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
  const [file, setFile] = useState("");
  const id = searchParams.get("id");

  useEffect(() => {
    getDataArticles(id);
  }, [id]);

  const getDataArticles = async (idd) => {
    try {
      const docRef = doc(db, "articles", idd);
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

      setTitle(data[0].title);
      setAuthor(data[0].author)
      setData(data[0].content);
      
      setDes(data[0].description);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      setFile(files.name);
      const storageRef = ref(storage, `/articles/${files.name}`);

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
      const storageRef = ref(storage, `/articles/${files.name}`);

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
    const todoRef = doc(db, "articles", id);

    if (file == "") {
      await updateDoc(todoRef, {
        title: title,
        author:author,
        content: data,
        description: des,
       
      });
    } else {
      await updateDoc(todoRef, {
        title: title,
         author:author,
        content: data,
        img: downloadURL,
        description: des,
       
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
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
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
    "font",
    "background",
    "size",
  ];
  return (
   <>
      {isAlert && (
        <div className="bgtr w-screen h-screen fixed top-0 flex items-center justify-center gap-5 z-50">
          <div className="flex-col">
            <div className=" text-2xl mb-5">Change Will not be saved</div>
            <div className="flex justify-between">
              <a href="/dashboardAdmin/articles">
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
            <p>Create New Article</p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <a href="/dashboardAdmin/articles">
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
                <p>Details</p>
              </div>
              <div className=" w-10/12 "></div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p> Article Title:</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  value={title}
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
             <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p> Author:</p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  required
                  value={author}
                  placeholder="Insert Author"
                  color=" bg-transparent"
                  className=" rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            {/* <div className=" flex py-1 px-20">
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
            </div> */}
            <div className=" flex py-1 ps-40 pt-32 ">
              <div className=" w-10/12 px-3 text-2xl font-semibold pt-5">
                <p>Main Description:</p>
              </div>
            </div>
            <div className=" flex py-1 px-20 ">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Description
                  <span className="text-red-600"> </span> :
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <Quilltext
                value={des}
                  onChange={(e) => setDes(e)}
                  name="contentIng"
                  placeholder={`Input Description ${1}`}
                />
              </div>
            </div>
            {/* <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Description
                  <span className="text-red-600"> Chinese</span> :
                </p>
              </div>
              <div className=" w-10/12 p-3">
                <Quilltext
                  onChange={(e) => setDesChi(e)}
                  name="contentChi"
                  placeholder={`Input Description Mandarin ${1}`}
                />
              </div>
            </div> */}
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
                    <div className=" w-2/12 text-end px-3 text-2xl font-semibold pt-5">
                      <p>Content:</p>
                    </div>
                    <div className=" w-10/12 "></div>
                  </div>
                  <div className=" flex py-1 px-20 ">
                    <div className=" w-2/12 text-end p-3 py-5">
                      <p>
                        Topic
                        <span className="text-red-600"> </span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <input
                        name="topicIng"
                        value={val.topicIng}
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        placeholder="input head topic"
                        color=" bg-transparent"
                        className=" rounded-lg w-full border-slate-300 "
                      />
                    </div>
                  </div>
                  {/* <div className=" flex py-1 px-20">
                    <div className=" w-2/12 text-end p-3 py-5">
                      <p>
                        Topic
                        <span className="text-red-600"> Chinese</span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <input
                        name="topicChi"
                        value={val.topicChi}
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        placeholder="input head topic"
                        color=" bg-transparent"
                        className=" rounded-lg w-full border-slate-300 "
                      />
                    </div>
                  </div> */}
                  <div className=" flex py-1 px-20 ">
                    <div className=" w-2/12 "></div>
                    <div className=" w-10/12 "></div>
                  </div>

                  <div className=" flex py-1 px-20 ">
                    <div className=" w-10/12 "></div>
                  </div>
                  <div className=" flex py-1 px-20 ">
                    <div className=" w-2/12 text-end p-3 py-5">
                      <p>
                        Description
                        <span className="text-red-600"> </span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <Quilltext
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
                        placeholder={`Input Description  ${
                          i + 1
                        }`}
                      />
                    </div>
                  </div>
                  {/* <div className=" flex py-1 px-20">
                    <div className=" w-2/12 text-end p-3 py-5">
                      <p>
                        Description
                        <span className="text-red-600"> Chinese</span> :
                      </p>
                    </div>
                    <div className=" w-10/12 p-3">
                      <Quilltext
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
                        placeholder={`Input Description Mandarin ${
                          i + 1
                        }`}
                      />
                    </div>
                  </div> */}

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
                    onClick={addData}
                    className="p-3 px-7  rounded-lg mb-5 text-white bg-green-400"
                  >
                    Edit Article
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

export default EditArticle;

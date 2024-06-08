import React from "react";

function EditData() {
  return (
    <>
      <div>EditData</div>
      <div>EditData</div>
      <div>EditData</div>
      <div className="flex justify-center items-center text-2xl font-semibold py-7 text-white bg-[#007aff]">
        <p>Edit Component Name</p>
      </div>
      {/* <div className="flex px-20">
        <div className=" w-2/12 text-end text-xl font-medium pe-3">
          <p>Enter New Content :</p>
        </div>
        <div className="w-10/12 "></div>
      </div> */}
      <div className=" flex p-5 px-20">
        <div className=" w-2/12 text-end p-3 py-5">
          <p>English :</p>
        </div>
        <div className=" w-10/12 p-3">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Input your message"
            color=" bg-transparent"
            className=" w-full resize-none rounded-lg border-slate-300 "
            maxLength={1000}
          ></textarea>
        </div>
      </div>
      <div className=" flex p-5 px-20">
        <div className=" w-2/12 text-end p-3 py-5">
          <p>Chinese :</p>
        </div>
        <div className=" w-10/12 p-3">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Input your message"
            color=" bg-transparent"
            className=" w-full resize-none rounded-lg border-slate-300 "
            maxLength={1000}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default EditData;

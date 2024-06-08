import React from "react";

function AdminAbout() {
  return (
    <>
      <p className="pt-5 text-center font-bold text-3xl">About</p>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-5">
          <div className="flex bg-slate-300 rounded-md  font-semibold">
            <div className="w-full flex">
              <div className="w-2/12 border-s-2  flex justify-start items-center p-2">
                <p>Section</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <p>Content</p>
              </div>
            </div>
            <div className="w-14  flex gap-3 mx-3 my-auto">
              <p>Edit</p>
            </div>
          </div>
          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 border-s-2 font-semibold flex justify-start items-center p-2">
                <p>Heading</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <div className="flex flex-col">
                  <p>About Us</p>
                  <p>Chinese</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                <img
                  className="w-8"
                  src="/assets/images/edit-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 border-s-2 font-semibold flex justify-start items-center p-2">
                <p>Paragraph</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <div className="flex flex-col">
                  <p>
                    TYS Consulting is a Business Consultant with main business
                    in providing one-stop enterprise consultation services for
                    enterprises or individuals who wants to establish business
                    in Indonesia. Our team are equipped to communicate in
                    Mandarin, English and Bahasa Indonesia with experiences on
                    helping numerous customers in various sectors from
                    establishment till ready to start business operation.
                  </p>
                  <p>Chinese</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                <img
                  className="w-8"
                  src="/assets/images/edit-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                <p>Address</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <p>Citra garden, Kalideres, Jakarta Barat 11840</p>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                <img
                  className="w-8"
                  src="/assets/images/edit-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                <p>Phone</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <p>0812-1355-1038</p>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                <img
                  className="w-8"
                  src="/assets/images/edit-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12  font-semibold flex justify-start items-center p-2">
                <p>EMail</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <p>marketing@.com</p>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                <img
                  className="w-8"
                  src="/assets/images/edit-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                <p>Barcode</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <img className="w-20" src="/assets/images/qr-tys.jpg" alt="" />
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                <img
                  className="w-8"
                  src="/assets/images/edit-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAbout;

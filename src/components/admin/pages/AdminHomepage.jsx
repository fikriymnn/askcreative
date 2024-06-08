import React from "react";

function AdminHomepage() {
  return (
    <>
      <p className="pt-5 text-center font-bold text-3xl">Homepage</p>

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
                  <p>Establish Your Business in Indonesia Conveniently</p>
                  <p>轻松开展印尼公司</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <a className="w-full" href="/dashboardAdmin/edit">
                <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                  <img
                    className="w-8"
                    src="/assets/images/edit-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </a>
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
                  <p>
                    TYS
                    咨询是一家咨询公司，主要业务是为有意在印尼开展业务的企业或个人提供一站式企业咨询
                    服务。我们的团队能够用普通话、英语和印度尼西亚语进行交流，并在帮助各行各业的众多客户
                    从成立到准备开始业务运营方面拥有丰富的经验
                  </p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <a className="w-full" href="/dashboardAdmin/edit">
                <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                  <img
                    className="w-8"
                    src="/assets/images/edit-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </a>
            </div>
          </div>

          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                <p>Service</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <div className="flex flex-col">
                  <p>What Service We Offer</p>
                  <p>我们提供的服务</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <a className="w-full" href="/dashboardAdmin/edit">
                <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                  <img
                    className="w-8"
                    src="/assets/images/edit-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </a>
            </div>
          </div>
          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                <p>Article</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <div className="flex flex-col">
                  <p>Latest Article</p>
                  <p>最新文章</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <a className="w-full" href="/dashboardAdmin/edit">
                <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                  <img
                    className="w-8"
                    src="/assets/images/edit-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </a>
            </div>
          </div>
          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12 font-semibold flex justify-start items-center p-2">
                <p>Package</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <div className="flex flex-col">
                  <p>Choose The Best Package You Need</p>
                  <p>选择您需要的服务包</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <a className="w-full" href="/dashboardAdmin/edit">
                <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                  <img
                    className="w-8"
                    src="/assets/images/edit-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </a>
            </div>
          </div>
          <div className="flex bg-slate-300 rounded-md">
            <div className="w-full flex">
              <div className="w-2/12  font-semibold flex justify-start items-center p-2">
                <p>Clients</p>
              </div>
              <div className="w-8/12 border-s-2  flex justify-start items-center p-2">
                <div className="flex flex-col">
                  <p>Our Clients</p>
                  <p>我们客户</p>
                </div>
              </div>
            </div>
            <div className="w-14  flex gap-3 m-3 my-auto">
              <a className="w-full" href="/dashboardAdmin/edit">
                <button className="bg-yellow-400 w-full h-10 rounded-md flex items-center justify-center m-auto">
                  <img
                    className="w-8"
                    src="/assets/images/edit-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHomepage;

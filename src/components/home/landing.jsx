import React from 'react'

function Landing({dataHeading, dataParagraph}) {
  return (
   <div className="bg-black">
        <div className='flex items-center justify-center bg-left bg-cover bg-[url("/assets/images/bgtwo.png")] text-white'>
          <div
            className="w-full h-full flex items-center bakg  p-5 lg:px-[10%] py-[20vh] lg:py-[30vh]  "
          >
            <div className="flex flex-col text-left lg:max-w-[50%]">
              <div className="font-semibold text-[2.5rem] lg:text-[3rem]">
                {dataHeading.map((data, i) => {
                  return (
                    <p key={i}>
                     {data.english}
                    </p>
                  );
                })}
              </div>
              <div className="mt-2 lg:text-[1.2rem]">
                {dataParagraph.map((data, i) => {
                  return (
                    <div key={i}>
                      {data.english}
                    </div>
                  );
                })}
              </div>
              {/* <a
                href="#about"
                className="bg-primary w-fit px-5 font-semibold py-3 mt-6 flex items-center space-x-2 cursor-pointer hover:brightness-110 transition-all"
              >
                <div>GET STARTED</div>
              </a> */}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Landing

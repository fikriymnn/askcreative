import React from 'react'

function LandCarousel() {
  return (
    <div className="bg-black">
        <div className='flex items-center justify-center bg-left bg-cover bg-[url("/assets/images/bgtwo.png")] text-white'>
          <div
            className="w-full h-full flex items-center bakg  p-5 lg:px-[10%] py-[20vh] lg:py-[30vh]  "
          >
            <div className="flex flex-col text-left lg:max-w-[55%]">
              <div className="font-semibold text-[2.5rem] lg:text-[3rem]">
                <p>Temukan Wewangian Anda Disini</p>
              </div>
              <div className="mt-2 lg:text-[1.2rem]">
                <p>ASKREATIF adalah perusahaan yang bergerak dibidang wewangian (ASKREATIF PERFUME) dan laboratorium skala mikro (ASKREATIF MICROLAB). ASKREATIF PERFUME menyediakan workshop formulasi parfum untuk memberikan pengalaman dan menjadikan anda formulator parfum baik untuk anda sendiri maupun keperluan bisnis. Kami juga menyediakan formula parfum, material wewangian dan alat-alat keperluan formulasi parfum, parfum permintaanmu, parfum ASKREATIF, dan virtual lab untuk merancang formula parfum secara ekslusif. ASKREATIF MICROLAB menyediakan peralatan-peralatan laboratorium skala micro seperti hotplate mini, klem dan statif mini, dan lain-lain.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandCarousel

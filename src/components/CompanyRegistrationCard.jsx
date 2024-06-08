import React from 'react'

function CompanyRegistrationCard({ title, src, price, key }) {


    return (
        <>
            <a key={key} href="/services/detail">


                <div className='bg-white shadow-xl hover:translate-y-[-10px] duration-300 md:block sm:block grid grid-cols-2 md:h-72'>
                    <div className=' bg-blue-700'>
                        <img src={src} alt="" />
                    </div>
                    <div className='p-3 md:w-full sm:w-full w-11/12 md:h-20'>
                        <h1 className='font-semibold text-gray-900  md:text-base sm:text-base text-sm mb-2 line-clamp-2 '>{title}</h1>
                        <h2 className='md:text-base sm:text-sm text-sm text-blue-600'>{price}</h2>
                    </div>




                </div>
            </a>
        </>

    )
}

export default CompanyRegistrationCard

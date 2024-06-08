import React from 'react'

function EventCard({ id, img, title, date,key }) {
    return (
        <div key={key}>
        <a href={`/events/event?id=${id}`}>
            <div className='bg-white shadow-xl hover:translate-y-[-10px] transition-transform duration-50 ease-in-out grid grid-cols-2 md:grid-cols-1'>
                <div className='h-28 md:h-36'>
                    <img src={img} alt="" />
                </div>
                <div className='p-3 '>
                    <h1 className='font-medium md:text-xl text-gray-900 line-clamp-2 '>{title}</h1>
                    <h2>{date}</h2>
                </div>

            </div>
        </a>
        </div>
    )
}

export default EventCard

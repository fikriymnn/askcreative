import React from 'react'

function CrudTable() {
    return (
        <div className='flex bg-slate-300 rounded-md mb-3'>
            <div className='p-2 h-full w-[50px] flex justify-start items-center '><p >1</p></div>
            <div className='p-2 h-full w-[200px] border-s-2'><img src="/foto.jpg" alt="" /></div>
            <div className='w-full flex'>
                <div className='w-4/12 border-s-2  flex justify-start items-center p-2'>

                    <div className='flex flex-col'>
                        <p >Title</p>
                        <p >Chinese</p>
                    </div>
                </div>
                <div className='w-6/12 border-s-2  flex justify-start items-center p-2'>

                    <div className='flex flex-col'>
                        <p >Content</p>
                        <p >Chinese</p>
                    </div>
                </div>
                <div className=' border-x-2 w-2/12 flex justify-start items-center p-2'>

                    <p>DD/MM/YY</p>
                </div>
            </div>
            <div className='w-56  flex gap-3 m-3 my-auto'>
                <button className='bg-green-600  h-10 rounded-md p-3 '> <img src="/assets/images/view-svgrepo-com.svg" alt="" /></button>
                <button className='bg-yellow-400 h-10 rounded-md p-3'><img src="/assets/images/edit-svgrepo-com.svg" alt="" /></button>
                <button className='bg-red-600 h-10 rounded-md p-3'><img src="/assets/images/delete-1-svgrepo-com.svg" alt="" /></button>

            </div>

        </div>
    )
}

export default CrudTable
import React from 'react'
// import { booklist } from '../../assets/data'
import { GetUrl } from '../../Functions/Functions'
import { useNavigate } from 'react-router-dom'
export const BookList = ({booklist}) => {

  const navigate=useNavigate()


  const handlBookDetails=(item)=>{

    navigate(`/${item._id}`,{state:{book:item}})
    

  }

  return (

    <>



      <div className='text-center'>
        <p className='text-4xl'>Books</p>
      </div>
      <br />

      <section className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5 pb-10'>


        {booklist.slice(0, 8).map((item, index) =>


          <div  onClick={()=>handlBookDetails(item)}  key={index} className=" cursor-pointer card card-compact bg-base-100 md:w-[300px] w-full border-2 border-gray-200 shadow-lg space-y-5 px-7 py-3 max-sm:mx-auto">
            <figure className='bg-gray-100 p-3'>
              <img
                src={GetUrl(item.image)}

                className='w-[100px]'
                alt="Shoes" />
            </figure>
            <div className='text-lime-500 font-semibold text-sm flex space-x-2 space-y-1 flex-wrap'>
              <p className='rounded-lg bg-gray-100 p-1 cursor-pointer'>Young Adult</p>
              <p className='rounded-lg bg-gray-100 p-1 cursor-pointer'>Identity</p>
            </div>
            <div className='space-y-3'>
              <h2 className="card-title">{item.bookName}</h2>
              <p>By: {item.author}</p>
              <hr style={{ borderTop: 'dotted 3px gray' }} />
              <div className='flex justify-between items-center'>
                <p>Fiction</p>
                <div className='flex items-center justify-center space-x-2'>
                  <p>{item.rating}</p>
                  <p className='text-xl cursor-pointer'>&#9956;</p>
                </div>
              </div>
            </div>
          </div>



        )}




      </section>

    </>

  )
}

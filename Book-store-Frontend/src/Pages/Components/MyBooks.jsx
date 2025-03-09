import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons'
import { faLocation } from '@fortawesome/free-solid-svg-icons/faLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const MyBooks = ({book}) => {
    return (
        <>

            <section className='p-10 border border-gray-300 rounded-xl flex md:space-x-7 max-sm:flex-col max-sm:space-y-5 max-sm:items-center'>

                <div className='w-[200px] bg-gray-200 rounded-xl p-4'>
                    <img src={`/assets/Books/${book.image}`} alt="" />
                </div>

                <div className='space-y-5 w-full max-sm:text-center'>

                    <p className='font-semibold text-xl'>{book.bookName}</p>
                    <p>By: <span className='font-semibold'>{book.author}</span></p>
                    <div className='space-y-4'>

                        <div className='flex flex-wrap space-x-5 items-center max-sm:items-center'>
                            <p className='font-semibold'>Tag</p>

                            {book.tags.map((item,index)=>{
                                return ( <p key={index} className='rounded-lg bg-gray-100 p-1 text-lime-500 cursor-pointer'>#{item}</p>)

                            })}
                           
                            {/* <p className='rounded-lg bg-gray-100 p-1 text-lime-500 cursor-pointer'>#Classic</p>
                            <p className='rounded-lg bg-gray-100 p-1 text-lime-500 cursor-pointer'>#Classic</p> */}
                            <div className='flex space-x-2 items-center'>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p>Year of Publishing: {book.yearOfPublishing}</p>
                            </div>

                        </div>
                        <div className='flex space-x-3'>

                            <div className='flex space-x-2 items-center'>

                                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
                                <p>Publisher: {book.publisher}</p>

                            </div>
                            <div className='flex space-x-2 items-center'>
                                <FontAwesomeIcon icon={faFileLines} />
                                <p>Page {book.totalPages}</p>
                            </div>


                        </div>
                        <hr />
                        <div className='flex space-x-3 max-sm:flex-wrap max-sm:space-y-2 items-center max-sm:justify-center'>
                            {/* <p className='px-4 py-2 rounded-xl  text-blue-500 bg-blue-300'>Category: Classic</p> */}
                            <p className='px-4 py-2 rounded-xl  text-orange-500 bg-orange-300'>rating <span className='font-semibold'>{book.rating}</span></p>
                            <p className='px-4 py-2 rounded-xl cursor-pointer text-white bg-lime-500'>View Details</p>
                        </div>
                    </div>


                </div>


            </section>

        </>
    )
}

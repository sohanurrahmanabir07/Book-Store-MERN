import React, { useRef } from 'react'
import { GetUrl } from '../../Functions/Functions'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const BookDetails = () => {
    const location = useLocation()
    const book = location?.state?.book
    const user=useSelector((state)=>state.book_store.users)
    const wishRef=useRef(null)
    
    const readRef=useRef(null)
    const data={
        '_id':user._id,
        'book':book
    }


    const handleChange=async (value)=>{
        


            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${value}`,data,{
               withCredentials:true,
               headers:{
                'Content-type':'application/json'
               }
            })
            .then((res)=>{
                if(res.status==201){
                    Swal.fire({
                        title: `Added to ${value.toUpperCase()}`,
                        text: "You clicked the button!",
                        icon: "success"
                      })
                }else if(res.status==203){
                    Swal.fire({
                        icon:"error",
                        title: res.data.message,
                        text: "You clicked the button!",
                      })
                }
            })
            .catch((err)=>{
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong Please Check Console!",
                  });
            })
       

    }
    return (
        <div>

            <section className='flex justify-center max-sm:flex-col md:space-x-10 max-sm:space-y-10 py-20'>

                <div className='px-20 py-5 bg-gray-100 rounded-3xl flex justify-center items-center'>
                    <img src={GetUrl(book?.image)} className='w-[300px]' alt="book" />
                </div>

                <div className='space-y-4 md:w-1/3 max-sm:w-ful max-sm:text-center'>
                    <p className='text-4xl font-semibold'>{book?.bookName}</p>
                    <p className='text-lg font-semibold text-gray-600'>by : {book?.author}</p>

                    <hr />
                    <p className='text-lg font-semibold text-gray-600'>{book?.category}</p>

                    <hr />
                    <p><span className='font-bold'>Review</span>: {book?.review}</p>
                    <div className='flex flex-wrap space-x-4 items-center max-sm:items-center max-sm:justify-center'>
                        <p className='font-bold'>Tag</p>
                        {book?.tags.map((item, index) =>
                            <p key={index} className='rounded-lg bg-gray-100 p-1 text-lime-500 cursor-pointer'>#{item}</p>

                        )}
                    </div>
                    <hr />
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <tbody>
                                {/* row 1 */}
                                <tr>

                                    <td>Number of Pages:</td>
                                    <td className='font-semibold'>{book?.totalPages}</td>

                                </tr>
                                {/* row 2 */}
                                <tr>


                                    <td>Publisher:</td>
                                    <td className='font-semibold'>{book?.publisher}</td>
                                </tr>
                                {/* row 3 */}
                                <tr>

                                    <td>Year of Publishing:</td>
                                    <td className='font-semibold'>{book?.yearOfPublishing}</td>
                                </tr>

                                <tr>


                                    <td>Rating:</td>
                                    <td className='font-semibold'>{book?.rating}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='flex space-x-5 max-sm:justify-center'>
                        <button onClick={()=>handleChange('readlist')} ref={readRef}  className="btn btn-outline btn-info">Read</button>
                        <button onClick={()=>handleChange('wishlist')} ref={wishRef}  className="btn btn-active btn-accent">Wishlist</button>
                    </div>
                </div>


            </section>

        </div>
    )
}

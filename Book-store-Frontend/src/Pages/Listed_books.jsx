import React, { useEffect, useState } from 'react'
import { MyBooks } from './Components/MyBooks'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const Listed_books = () => {

  const [tab, setTab] = useState('wishlist')

  const [booklist, setBookList] = useState(null)
  const user_id = useSelector((state) => state.book_store.users._id)


  useEffect(() => {




    const getBooks = async () => {

      // console.log(`http://localhost:5000/get-books/${tab}/${user_id}`)

      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-books/${tab}/${user_id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status == 201) {
            const data = (res.data.books)

            const books = []
            Object.keys(data).map((item, index) => {
              books.push(data[item])
            })
            setBookList(books)
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });

          console.log(err)
        })


    }
    if (user_id) {
      getBooks();
    }


  }, [tab])


  const handleSort = (e) => {

    if (booklist) {
      const sorting_type = e.target.getAttribute('data-value')
      const newlist = [...booklist]
      if (sorting_type == 'ratings') {
        newlist.sort((a, b) => b.rating - a.rating)
      } else if (sorting_type == 'recent') {
        newlist.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing)
      } else {
        newlist.sort((a, b) => b.totalPages - a.totalPages
        )
      }

      setBookList(newlist)
    }






  }

  const handleTab = (value) => {
    setTab(value)

  }

  return (
    <>

      <div className='bg-gray-200 rounded-2xl p-10 text-center'>
        <p className='text-xl font-bold'>Books</p>
      </div>


      <div className='text-center my-10'>
        <div className="dropdown w-[150px]  font-semibold ">
          <div className='flex space-x-3'>
            <div tabIndex={0} role="button" className="btn w-full text-center bg-lime-500 text-white">
              <span className='text-noraml'>Click</span> <span className=' text-lg'>&#8595;</span>


            </div>
          </div>

          <ul tabIndex={0} className=" space-y-3 w-full dropdown-content menu bg-base-200 rounded-lg z-1 p-2 shadow-sm">
            <li className='cursor-pointer hover:bg-gray-100 w-full' data-value='recent' onClick={(e) => handleSort(e)}>Recently Published</li>
            <li className='cursor-pointer hover:bg-gray-100 w-full' data-value='ratings' onClick={(e) => handleSort(e)} >Top Ratings</li>
            <li className='cursor-pointer hover:bg-gray-100 w-full' data-value='pages' onClick={(e) => handleSort(e)} >Highest Pages</li>
          </ul>
        </div>



      </div>


      {/* -_____________________Tab______________________________________ */}

      <section className={`text-lg text-center flex space-x-1 z-2 max-w-[1500px] md:mx-auto`}>

        <div onClick={() => handleTab('readlist')} className={`p-4 rounded-t-2xl border border-gray-200 cursor-pointer ${tab == 'readlist' ? 'bg-lime-500 text-white' : ''}`}>
          <p>Readlist Books</p>
        </div>

        <div onClick={() => handleTab('wishlist')} className={`p-4 rounded-t-2xl border border-gray-200 cursor-pointer ${tab == 'wishlist' ? 'bg-lime-500 text-white' : ''}`}>
          <p>Wishlist Books</p>
        </div>

      </section>

      {/* -_____________________Tab______________________________________ */}

      <hr />



      {booklist ? booklist.map((item, index) => {


        return (<div className='my-5' key={index} >
          <MyBooks book={item}  ></MyBooks>
        </div>)


      }) : ''}







      <br />













    </>
  )
}

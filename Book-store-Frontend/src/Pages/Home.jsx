import React, { useEffect, useState } from 'react'
import { Hero } from './Components/Hero'
import { BookList } from './Components/BookList'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../redux/bookstore'

export const Home = () => {

  const [booklist, setBookList] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {

    fetch(`${import.meta.env.VITE_BACKEND_URL}/book-list`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) =>
        setBookList(data.data)
      )
      .catch(err => console.log(err))

  }, [])
  return (


    <div>
      <Hero></Hero>
      {booklist ?

        (<>
          < BookList booklist={booklist}></BookList>

        </>
        )



        :
        (<div>

          <div className="loading loading-dots loading-xl m-auto lg:w-[50px] table"></div>
        </div>
        )

      }

    </div >
  )
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer/Footer'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

function Root() {
  const Myswal=withReactContent(Swal)
  return (
    <>

      <Navbar></Navbar>
      <div className='md:max-w-[1500px] md:mx-auto max-sm:px-5 md:px-5'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>

    </>
  )
}

export default Root

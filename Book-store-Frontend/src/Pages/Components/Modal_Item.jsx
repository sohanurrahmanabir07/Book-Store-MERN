import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/bookstore'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const Modal_Item = ({ modalRef, type }) => {

  const Myswal = withReactContent(Swal)
  const dispatch = useDispatch()
  let [formData, setFormData] = useState({
    'name': '',
    'address': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'wishlist': {},
    'readlist': {}
  })
  let title = ""
  if (type == 'signup') {
    title = "Sign Up"
  } else {
    title = "Sign In"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (type == 'signup' && (formData.password == formData.confirmPassword)) {
      delete formData.confirmPassword


      axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData, {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
        if (res.status == 201) {
          modalRef.current.close()
          Myswal.fire({
            title: "Sign Up Successful!",
            text: "You clicked the button!",
            icon: "success"
          })
        } else {
          modalRef.current.close()
          Myswal.fire({
            title: "SomeThing Went Wrong!",
            text: "You clicked the button!",
            icon: "error"
          })
        }


      })
        .catch(err => {
          modalRef.current.close()
          Myswal.fire({
            title: "Server Error!",
            text: "You clicked the button!",
            icon: "Error"
          })

        })




    }

    if (type == 'signin') {
      delete formData.name
      delete formData.address
      delete formData.confirmPassword

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData, {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {

        if (res.status == 201) {
          modalRef.current.close()
          Myswal.fire({
            title: "Login Successful!",
            text: "You clicked the button!",
            icon: "success"
          })
          dispatch(addUser(res.data.user))
        }


      })
        .catch(err => console.log(err))

    }



    setFormData({
      'name': '',
      'address': '',
      'email': '',
      'password': '',
      'confirmPassword': '',
      'wishlist': {},
      'readlist': {}
    })
  }

  const handleForm = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }


  return (
    <>

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box ">

          <h3 className="font-bold text-lg">{title}</h3>
          <form method="dialog" className='flex flex-col items-center space-y-3 py-3' onSubmit={handleSubmit}>

            {type == 'signup' ? (<>
              <p className='font-semibold'>Name</p>
              <input type="text" name="name" className='w-3/4 rounded-lg border-base-300' onChange={handleForm} value={formData.name} />
            </>) : ''}

            <p className='font-semibold'>Email</p>
            <input type="text" name="email" className='w-3/4 rounded-lg border-base-300' onChange={handleForm} value={formData.email} />
            {type == 'signup' ?
              <>
                <p className='font-semibold'>Address</p>
                <input type="text" name="address" className='w-3/4 rounded-lg border-base-300' onChange={handleForm} value={formData.address} />
              </> : ''}
            <p className='font-semibold'> Password</p>
            <input type="password" className='w-3/4 rounded-lg border-base-300' name="password" onChange={handleForm} value={formData.password} />
            {type == 'signup' ?
              <>
                <p className='font-semibold'>Confirm Password</p>
                <input type="password" className='w-3/4 rounded-lg border-base-300' name="confirmPassword" onChange={handleForm} value={formData.confirmPassword} />
              </> : ''}
            <button className='btn'>Submit</button>


          </form>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => modalRef.current.close()}>✕</button>

        </div>
      </dialog>

    </>
  )
}

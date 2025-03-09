import React, { useRef } from 'react'
import { Link, NavLink } from "react-router";

import { useState } from 'react';
import { Modal_Item } from '../Pages/Components/Modal_Item';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/bookstore';
export const Navbar = () => {

    const [OpenModal, setOpenModal] = useState(false);
    const dispatch = useDispatch()
    const [modalValue, setModalValue] = useState('')
    const [logged, SetLogged] = useState('')
    const [sidebar, setSidebar] = useState(false)
    const user = useSelector((state) => state.book_store.users)
    const modalRef = useRef(null)
    const handleModal = (e) => {

        setOpenModal(!OpenModal)
        const modal_val = e.target.getAttribute("data-value")
        setModalValue(modal_val)

        modalRef.current.showModal()




    }
    const [dropdown, setDropDown] = useState(false)

    return (
        <>
            <section className='relative'>
                <div className="navbar bg-base-100 md:max-w-[1500px] md:mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box space-y-4 z-[1] mt-3 w-52 p-2 shadow">
                                <li><NavLink to='/'>Home</NavLink></li>
                                <li>

                                    <NavLink to='/listed-books'>Listed Books</NavLink>

                                </li>
                                <li><NavLink to='/pages-to-read'>Pages To Read</NavLink></li>
                                {/* <a onClick={(e) => handleModal(e)} data-value='signup' className="btn bg-lime-500 text-white">Sign Up</a>
                            <a onClick={(e) => handleModal(e)} data-value='signin' className="btn bg-cyan-500  text-white">Sign In</a> */}


                                {user.length == 0 ?
                                    (<div className="navbar-end w-full justify-between">
                                        <a onClick={(e) => handleModal(e)} data-value='signup' className="btn bg-lime-500 text-white">Sign Up</a>
                                        <a onClick={(e) => handleModal(e)} data-value='signin' className="btn bg-cyan-500 ml-2 text-white">Sign In</a>
                                    </div>)


                                    :



                                    (<div className="navbar-end avatar flex flex-col ">
                                        <div style={{ anchorName: "--anchor-1" }} className=" cursor-pointer rounded-full  w-[50px]" onClick={() => setDropDown(!dropdown)}>
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>

                                        {dropdown && (
                                            <ul className=' top-full right-0 text-left mt-3 bg-white w-[200px] rounded-lg '>
                                                <li className='p-2 hover:bg-base-200 cursor-pointer'>Profile</li>
                                                <hr />
                                                <li className='p-2 hover:bg-base-200 cursor-pointer'>Settings</li>
                                                <hr />
                                                <li className='p-2 hover:bg-base-200 text-red-500 cursor-pointer'
                                                    onClick={() => dispatch(removeUser())}
                                                >Logout</li>


                                            </ul>
                                        )}




                                    </div>

                                    )
                                }
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-3xl">Book Vibe</a>
                    </div>
                    <div className="text-lg navbar-center hidden lg:flex ">
                        <ul className="menu menu-horizontal px-1 text-lg">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li>

                                <NavLink to='/listed-books'>Listed Books</NavLink>

                            </li>
                            <li><NavLink to='/pages-to-read'>Pages To Read</NavLink></li>

                        </ul>
                    </div>



                    {user.length == 0 ?
                        (<div className="navbar-end max-sm:hidden">
                            <a onClick={(e) => handleModal(e)} data-value='signup' className="btn bg-lime-500 text-white">Sign Up</a>
                            <a onClick={(e) => handleModal(e)} data-value='signin' className="btn bg-cyan-500 ml-2 text-white">Sign In</a>
                        </div>)


                        :



                        (<div className="navbar-end avatar relative max-sm:hidden">
                            <div style={{ anchorName: "--anchor-1" }} class=" cursor-pointer rounded-full  w-[50px]" onClick={() => setDropDown(!dropdown)}>
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>

                            {dropdown && (
                                <ul className='absolute top-full right-0 text-right mt-3 bg-white w-[200px] border border-base-300 rounded-lg '>
                                    <li className='p-2 hover:bg-base-200 cursor-pointer'>Profile</li>
                                    <li className='p-2 hover:bg-base-200 cursor-pointer'>Settings</li>
                                    <li className='p-2 hover:bg-base-200 text-red-500 cursor-pointer'
                                        onClick={() => dispatch(removeUser())}
                                    >Logout</li>

                                </ul>
                            )}




                        </div>

                        )
                    }

                    {/* <button onClick={() => setSidebar(!sidebar)} className='btn bg-primary text-white'>Sidebar</button> */}


                    <Modal_Item modalRef={modalRef} type={modalValue} ></Modal_Item>


                </div>


                {/* <div className={`bg-yellow-100 w-1/6 h-screen absolute top-full transition-all delay-200 duration-400 ease-in-out ${sidebar ? 'left-0' : '-left-full'}`}>
                    <p>NavbAr</p>
                </div> */}
            </section>

        </>


    )
}

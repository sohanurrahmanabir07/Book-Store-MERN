import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Modal_Item } from './Modal_Item'
import { RedirectLogin } from './RedirectLogin'

export const Privateroute = () => {
    const user = useSelector((state) => state.book_store.users)
    const modalRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()


    if (user.length !== 0) {
        return <Outlet />;
    }

    return <RedirectLogin form_type={'signin'}></RedirectLogin>

}

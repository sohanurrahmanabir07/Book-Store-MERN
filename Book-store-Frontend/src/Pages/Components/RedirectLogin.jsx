import React, { useEffect, useRef } from 'react'
import { Modal_Item } from './Modal_Item'

export const RedirectLogin = ({form_type}) => {
 const modalRef=useRef(null)

 useEffect(()=>{

    if(modalRef.current){
        modalRef.current.showModal();
    }
 },[modalRef.current])
 return (
    <Modal_Item modalRef={modalRef} type={form_type}></Modal_Item>
 )
}

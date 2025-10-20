import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({children, open, className = '', ...props}) {
    
    const dialog = useRef()

    useEffect(() => {
        if(open) {
            dialog.current.showModal()
        }
    },[open])

    return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} {...props}>
        {children}
    </dialog>
   , document.getElementById('modal')) 
}
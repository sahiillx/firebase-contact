import { doc } from "firebase/firestore";
import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="min-h-[300px] max-w-[370px] bg-white p-4 relative z-50 m-auto">
            <div className="flex justify-end ">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
              
            </div>
            {children}
          </div>
          <div onClick={onClose} className="absolute top-0 z-40 h-screen w-screen backdrop-blur-sm"/>
        </>
      )}
    </>
  ,document.getElementById("modal-root"));
};

export default Modal;

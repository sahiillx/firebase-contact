import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiEditCircleLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";
import UpdateContacts from "./UpdateContacts";
import useDisclose  from "../hooks/useDisclose"; 
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const {onClose, onOpen, isOpen} = useDisclose();


  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
        toast.warn("Contact Deleted successfully");
    } catch (error) {}
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between items-center p-2 m-2 rounded-lg "
      >
        <div className="flex items-center gap-4">
          <FaRegUserCircle className="text-orange text-4xl" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <RiEditCircleLine className="text-2xl cursor-pointer" onClick={onOpen}/>
          <FaRegTrashCan
            className="text-2xl text-orange cursor-pointer"
            onClick={() => {
              deleteContact(contact.id);
            }}
          />
        </div>
      </div>
      <UpdateContacts contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;

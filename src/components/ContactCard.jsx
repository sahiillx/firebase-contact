import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiEditCircleLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

const ContactCard = ({ contact }) => {
  return (
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
        <RiEditCircleLine className="text-2xl " />
        <FaRegTrashCan className="text-2xl text-orange" />
      </div>
    </div>
  );
};

export default ContactCard;

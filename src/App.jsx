import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

import { FaRegTrashCan } from "react-icons/fa6";
import { RiEditCircleLine } from "react-icons/ri";

import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";



const App = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsref = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsref);
        const contactsList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setContacts(contactsList);

      } catch (error) {

      }
    }

    getContacts();
  }, []);

  return (
    <div className="max-w-[400px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow ">
          <FiSearch className=" ml-2 cursor-pointer text-2xl text-white absolute" />

          <input type="text" placeholder="Search Contact" className=" flex-grow bg-transparent border rounded-md h-10 text-white pl-10 text-l" />
        </div>

        <AiFillPlusCircle className="text-white cursor-pointer text-5xl" />

      </div>
      <div className="mt-10">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-yellow flex justify-between items-center p-2 m-2 rounded-lg ">
            <div className="flex items-center gap-4">
            <FaRegUserCircle className="text-orange text-4xl"/>
            <div className="">
              <h2 className="font-medium">{contact.name}</h2>
              <p className="text-sm">{contact.email}</p>
            </div>
            </div>
            <div className="flex gap-2">
              <RiEditCircleLine className="text-2xl "/>
              <FaRegTrashCan className="text-2xl text-orange" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

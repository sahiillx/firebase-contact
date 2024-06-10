import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import Modal from "./components/Modal";
import ContactCard from "./components/ContactCard";

import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setisOpen] = useState(false);

  const onOpen = () => {
    setisOpen(true);
  };
  const onClose = () => {
    setisOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsref = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsref);
        const contactsList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactsList);
      } catch (error) {}
    };

    getContacts();
  }, []);

  return (
    <>
      <div className="max-w-[400px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow ">
            <FiSearch className=" ml-2 cursor-pointer text-2xl text-white absolute" />

            <input
              type="text"
              placeholder="Search Contact"
              className=" flex-grow bg-transparent border rounded-md h-10 text-white pl-10 text-l"
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-white cursor-pointer text-5xl"
          />
        </div>
        <div className="mt-10 flex flex-col">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        Hii I am Modal
      </Modal>
    </>
  );
};

export default App;

import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import Modal from "./components/Modal";
import ContactCard from "./components/ContactCard";
import UpdateContacts from "./components/UpdateContacts";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclose();



  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsref = collection(db, "contacts");
        onSnapshot(contactsref, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
          return contactsList;

        });


      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsref = collection(db, "contacts");
        onSnapshot(contactsref, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const filteredContacts = contactsList.filter((contact) => 
            contact.name.toLowerCase().includes(value.toLowerCase())
          );

          setContacts(filteredContacts);
          return filteredContacts;

        });
  }

  return (
    <>
      <div className="max-w-[400px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow ">
            <FiSearch className=" ml-2 cursor-pointer text-2xl text-white absolute" />

            <input
            onChange={filterContacts}
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
      <UpdateContacts isOpen={isOpen} onClose={onClose} />
      <ToastContainer 
        autoClose={1500}
        position="bottom-center"
      />  
    </>
  );
};

export default App;

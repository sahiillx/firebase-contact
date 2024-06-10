import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
})


const UpdateContacts = ({ isOpen, onClose, isUpdate, contact }) => {

    const addContact = async (contact) => {
        try {
            const contactref = collection(db, "contacts");
            await addDoc(contactref, contact)
            onClose();
            toast.success("Contact added successfully");
            
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact = async (contact, id) => {
        try {
            const contactref = doc(db, "contacts", id);
            await updateDoc(contactref, contact)
            onClose();
            toast.success("Contact updated successfully");
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={isUpdate ? {
                        name: contact.name,
                        email: contact.email,
                    } : {
                        name: "",
                        email: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate ?
                        updateContact(values, contact.id) :
                        addContact(values);
                        
                    }}
                >
                    <Form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xl">Name</label>
                            <Field name="name" className="border-2 h-10 rounded border-black p-2" />
                            <div className="text-red-500 text-xm">
                                <ErrorMessage name = "name" />
                            </div>
                            <label htmlFor="email " className="text-xl">Email</label>
                            <Field name="email" className="border-2 h-10 rounded border-black p-2" />
                            <div className="text-red-500 text-xm">
                                <ErrorMessage name = "email" />
                            </div>
                        </div>
                        
                        <button type="submit" className="bg-orange self-center px-3 py-2 rounded border-2 border-black m-5 text-xl" >
                            {isUpdate ? "Update " : "Add "}Contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default UpdateContacts;

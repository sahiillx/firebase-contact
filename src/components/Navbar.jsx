import React from "react";
import firebasesvg from "../assets/firebase.svg";

const Navbar = () => {
    return <div className="my-4 flex h-[60px] items-center justify-center gap-4 rounded-lg bg-white text-lg font-medium  ">
        <img src={firebasesvg} alt="" />
        <h1>Firebase Contact Apps</h1>
    </div>;
};

export default Navbar;

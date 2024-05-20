import React from "react";
import images from "../assets";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const navItems = [
    { path: "/", link: "Home" },
    { path: "/about", link: "About" },
    { path: "/join", link: "Write" },
    // {path: '/', link:'Home'}
  ];

  return (
    <header className=" h-20 w-full flex justify-between  items-center ">
      <div>
        <img src={images.Logo} className="w-28 h-10" alt="logo" />
      </div>
      <div >
        <ul   className=" w-full sm:flex gap-8 justify-center hidden items-center">
          {navItems.map((item,index) => (
            <li key={index}>
              <Link  to={item.path}>{item.link}</Link>
            </li>
          ))}
      
      <button className="border-2 border-blue-500 px-6 py-2 rounded-full
         text-blue-500 hover:bg-blue-700 hover:text-white">
            Sign in
          </button>
        </ul>
  
        <div className="px-4"  >
          <GiHamburgerMenu  className="size-6  sm:hidden "/>
          </div>
      </div>
    </header>
  );
};

export default Header;

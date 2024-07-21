import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const { isDarkMode } = useSelector((state) => state.user);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="flex flex-col md:flex-row font-Poppins">
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black border-r-2 dark:border-white border-gray-600 items-center justify-center">
        <Link to="/" className="w-1/2">
          <img src={Logo} alt="logo" />
        </Link>

        <div className="flex flex-col p-5 items-center justify-center text-white text-center">
          <span className="text-2xl font-semibold">
            Unlock Exclusive Content
          </span>
          <span className="mt-2">Join our community and discover more!</span>
        </div>
      </div>
      <div className="flex bg-white w-full md:w-2/3 min-h-screen dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black  items-center px-6 md:px-20 lg:px-40">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { isDarkMode } = useSelector((state) => state.user);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="dark:bg-slate-800  bg-white dark:text-white   bg-gray-400-600  flex flex-col h-full  font-Poppins">
      <div className="  container mx-auto 2xl:px-40 px-5  xl:px-36 lg:px-32 md:px-12 ">
        <Header />
        <div className="h-full dark:bg-slate-800 bg-white  overflow-y-auto ">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

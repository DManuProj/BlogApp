import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className=" bg-gray-400-600  flex flex-col h-screen   font-Poppins">
      <div className="  container mx-auto 2xl:px-48  xl:px-36 lg:px-32 md:px-12 ">
        <Header />
        <div className="h-full overflow-y-auto ">
          <Outlet />
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;

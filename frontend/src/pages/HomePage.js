import React from "react";
import BlogArea from "../components/homePage/BlogArea";
import TreadingBlogCard from "../components/homePage/TreadingBlogCard";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import images from "../assets/index";

const HomePage = () => {
  const { isLoading } = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="h-128   items-center w-full gap-3  sm:flex sm:justify-between sm:items-center border-b-2 border-gray-300 ">
        <div className=" flex-col  sm:w-2/3 ">
          <h2
            className=" font-bold font-sans text-slate-800 dark:text-white flex-auto sm:p-0  pt-6 text-center text-4xl   sm:text-left md:text-5xl
       lg:text-5xl xl:text-7xl    sm:text-4xl  mb-4 xl:mb-8 md:mb-4
        "
          >
            Crafting Stories in the Digital Realm
          </h2>
          <p className="  text-gray-500  dark:text-white  lg:text-lg sm:text-sm text-center sm:text-justify sm:p-0  p-2 2xl:mt-8">
            Dive into a world of creativity, knowledge, and discovery. From tech
            trends to travel tips, wellness to wonders of the world, our blog is
            your gateway to endless inspiration.🚀🌟
          </p>
        </div>
        <div className=" sm:w-1/2 flex justify-center sm:justify-end items-center ">
          <img
            className="object-cover   2xl:w-102 2xl:h-102 xl:w-96 xl:h-96  w-80 h-80   "
            src={images.Reading}
            alt="reading"
          />
        </div>
      </div>
      <TreadingBlogCard />
      <BlogArea />
      {isLoading && <LoadingSpinner />}
    </Layout>
  );
};

export default HomePage;

import React from "react";
import HeroSection from "../components/homePage/HeroSection";
import BlogArea from "../components/homePage/BlogArea";
import TreadingBlogCard from "../components/homePage/TreadingBlogCard";




const HomePage = () => {
  return (
    <div >
      <HeroSection />
      <TreadingBlogCard />
      < BlogArea/>
    </div>
  );
};

export default HomePage;

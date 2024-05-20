import React, { useState } from "react";

import { Box, Grid, Pagination, Stack } from "@mui/material";
import SearchFelid from "./SearchFelid";
import BlogCard from "../BlogCard";
import images from "../../assets";
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const BlogArea = () => {
  const trendingBlogs = [
    {
      date: "May, 15, 2024",
      category: "Marketing",
      heading: "Boost your conversion rate",
      body: " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      profileImg: images.Reading,
      name: "Dulana Wanigathunga",
      role: "Software Engineer",
    },
    {
      date: "May, 31, 2024",
      category: "Frontend",
      heading: "How Use Tailwind effectively",
      body: " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      profileImg: images.Reading,
      name: "Dulana Wanigathunga",
      role: "Software Engineer",
    },
    {
      date: "April, 16, 2024",
      category: "Development",
      heading: "What is Agile",
      body: " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo.dsdsdssssssssssssssassssssssssssssssssssss Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      profileImg: images.Reading,
      name: "Dulana Wanigathunga",
      role: "Software Engineer",
    },
  ];

  const [page, setPage] = useState(1)
  const [filterSearch, setFilterSearch] = useState("")

  const handleSearchChange = (value) => {
    setFilterSearch(value);
  };

  const filteredBlogs = trendingBlogs.filter((blog) =>{
    return blog.heading.toLowerCase().includes(filterSearch.toLowerCase())
  }
  );
 
  console.log("in the blog",filterSearch);
  return (
    <div className="mt-10  py-4">
      <div className="text-center m-10 ">
        <h2 className="container mb-5 px-2 lg:p-0 md:p-0 xl:p0 2xl:p-0  text-4xl md:text-5xl">
          From the Blog
        </h2>
        <p className="text-xl text">Let's start here..</p>
      </div>
      <div className="w-full sm:w-1/3 mb-4 px-4">
        <SearchFelid search={trendingBlogs} onSearchChange={handleSearchChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
      {filteredBlogs.map(
          ({ date, category, name, heading, body, role, profileImg }, index) => (
            <BlogCard
              key={index}
              date={date}
              category={category}
              name={name}
              blogTitle={heading}
              description={body}
              role={role}
              profileImg={profileImg}
            />
          )
        )}
      </div>
      <div className="bg-red-400 h-16 flex justify-center items-center">

      <Pagination count={10} onChange={(event, value) => setPage(value)} size="large" />
      </div>

  
    </div>
  );
};

export default BlogArea;

import React, { useState } from "react";
import { Pagination } from "@mui/material";
import SearchFelid from "./SearchFelid";
import BlogCard from "../BlogCard";
import images from "../../assets";
import { usePost } from "../../hooks/postHook";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogArea = () => {
  const { posts, numOfPages, setPage, isLoading } = usePost({ writerId: "" });
  const { isDarkMode } = useSelector((state) => state.user);

  const trendingBlogs = [
    {
      id: 1,
      date: "May, 15, 2024",
      slug: "fullstack-social-media-app-full-code",
      category: "Marketing",
      heading: "Boost your conversion rate",
      body: " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      profileImg: images.Reading,
      name: "Dulana Wanigathunga",
      role: "Software Engineer",
    },
    {
      id: 2,
      date: "May, 31, 2024",
      slug: "fullstack-social-media-app-full-code",
      category: "Frontend",
      heading: "How Use Tailwind effectively",
      body: " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      profileImg: images.Reading,
      name: "Dulana Wanigathunga",
      role: "Software Engineer",
    },
    {
      id: 3,
      date: "April, 16, 2024",
      slug: "fullstack-social-media-app-full-code",
      category: "Development",
      heading: "What is Agile",
      body: " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo.dsdsdssssssssssssssassssssssssssssssssssss Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      profileImg: images.Reading,
      name: "Dulana Wanigathunga",
      role: "Software Engineer",
    },
  ];

  const [filterSearch, setFilterSearch] = useState("");

  const handleSearchChange = (value) => {
    setFilterSearch(value);
  };

  const filteredBlogs = posts.filter((blog) => {
    return blog.title.toLowerCase().includes(filterSearch.toLowerCase());
  });

  return (
    <div className=" h-4/5 mt-14 flex flex-col justify-center items-center dark:text-white   py-4">
      <div>
        <div className="text-center m-10 ">
          <h2 className=" text-slate-800 dark:text-white  font-bold  container mb-5 px-2 lg:p-0 md:p-0 xl:p0 2xl:p-0  text-4xl md:text-5xl">
            From the Blog
          </h2>
          <p className=" text-slate-800 text-xl text">Let's start here..</p>
        </div>
        <div className="w-full lg:w-1/3 mb-4 px-4">
          <SearchFelid
            search={trendingBlogs}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 p-4 ">
          {filteredBlogs.map(
            (
              { updatedAt, slug, _id, category, user, title, description, img },
              index
            ) => (
              <Link to={`blog/${slug}/${_id}`} key={index}>
                <BlogCard
                  id={_id}
                  date={updatedAt}
                  category={category}
                  name={user.name}
                  blogTitle={title}
                  description={description}
                  role={user.role}
                  image={img}
                  profileImg={user.image}
                  slug={slug}
                  user={user}
                />
              </Link>
            )
          )}
        </div>
        <div className="  mt-10 h-16 flex justify-center items-center">
          <Pagination
            count={numOfPages}
            onChange={(event, value) => setPage(value)}
            size="large"
            color="primary"
            sx={{
              "&   .MuiPaginationItem-root": {
                color: `${isDarkMode ? "white" : ""}`,
              },
              //   "&   .css-bf9wz-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected ":
              //     {
              //       backgroundColor: `${isDarkMode ? "white" : ""}`,
              //     },
            }}
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default BlogArea;

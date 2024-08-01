import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Pagination } from "@mui/material";
import SearchField from "./SearchFelid";
import BlogCard from "../BlogCard";
import images from "../../assets";
import { usePost } from "../../hooks/postHook";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogArea = () => {
  const { posts, numOfPages, setPage, isLoading } = usePost({ writerId: "" });
  const { isDarkMode } = useSelector((state) => state.user);

  const [filterSearch, setFilterSearch] = useState("");
  const refHeading = useRef(null);
  const refContent = useRef(null);
  const isInViewHeading = useInView(refHeading, { once: false });
  const isInViewContent = useInView(refContent, { once: false });

  const handleSearchChange = (value) => {
    setFilterSearch(value);
  };

  const filteredBlogs = posts.filter((blog) => {
    return blog.title.toLowerCase().includes(filterSearch.toLowerCase());
  });

  return (
    <motion.div className="h-4/5 mt-14 flex flex-col justify-center items-center dark:text-white py-4">
      <div ref={refHeading}>
        <div className="text-center m-10">
          <motion.h2
            className="text-slate-800 dark:text-white font-bold container mb-5 px-2 lg:p-0 md:p-0 xl:p0 2xl:p-0 text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -50 }}
            animate={
              isInViewHeading ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
            }
            transition={{ duration: 0.5 }}
          >
            From the Blog
          </motion.h2>
          <motion.p
            className="text-slate-800 text-xl text"
            initial={{ opacity: 0, y: -30 }}
            animate={
              isInViewHeading ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's start here..
          </motion.p>
        </div>
      </div>
      <div ref={refContent}>
        <div className="w-full lg:w-1/3 mb-4 px-4">
          <SearchField
            search={filteredBlogs}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 p-4">
          {filteredBlogs.map(
            (
              { updatedAt, slug, _id, category, user, title, description, img },
              index
            ) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: isInViewContent ? 1 : 0,
                  y: isInViewContent ? 0 : 50,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
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
              </motion.div>
            )
          )}
        </div>
        <div className="mt-10 h-16 flex justify-center items-center">
          <Pagination
            count={numOfPages}
            onChange={(event, value) => setPage(value)}
            size="large"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: `${isDarkMode ? "white" : ""}`,
              },
            }}
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
    </motion.div>
  );
};

export default BlogArea;

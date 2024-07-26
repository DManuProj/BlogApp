import React from "react";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { AiOutlineArrowRight } from "react-icons/ai";

export const WritersBlog = ({ post, index }) => {
  const categoryColors = {
    EDUCATION: "bg-blue-600",
    CODING: "bg-green-600",
    NEWS: "bg-yellow-600",
    SPORTS: "bg-purple-600",
    Entertainment: "bg-red-600",
  };
  const catColor = categoryColors[post?.category] || "bg-gray-600";
  return (
    <article className="flex flex-col w-full  justify-between h-full ">
      <div className="w-full    rounded-2xl ">
        <Link to={`/blog/${post.slug}/${post._id}`}>
          <img
            className="  w-full h-auto md:h-64 md:w-4/5 rounded-2xl  object-cover"
            src={post.img}
            alt={post.title}
          />
        </Link>
      </div>
      <div className="flex dark:text-white gap-4 text-sm text-gray-600 mt-4">
        <span>{new Date(post.createdAt).toDateString()}</span>
        <span
          className={`  text-white rounded-lg px-2 2xl:text-sm ${catColor} font-medium`}
        >
          {post.category}
        </span>
      </div>
      <div className="flex  flex-col justify-start mt-4">
        <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-900">
          {post.title}
        </h3>
        <p className="mt-2 md:w-4/5  dark:text-white line-clamp-3 text-sm leading-6 text-gray-600">
          <Markdown options={{ wrapper: "article" }}>
            {post.description.slice(0, 250) + "..."}
          </Markdown>
        </p>
        <Link
          to={`blog/${post.slug}/${post._id}`}
          className="flex items-center gap-2 text-black dark:text-white"
        >
          <span className="underline">Read More</span> <AiOutlineArrowRight />
        </Link>
      </div>
    </article>
  );
};

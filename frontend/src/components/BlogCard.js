import Markdown from "markdown-to-jsx";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  date,
  category,
  blogTitle,
  description,
  profileImg,
  name,
  role,
  image,
  user,
  slug,
  id,
}) => {
  const categoryColors = {
    EDUCATION: "bg-blue-600",
    CODING: "bg-green-600",
    NEWS: "bg-yellow-600",
    SPORTS: "bg-purple-600",
    Entertainment: "bg-red-600",
  };
  const catColor = categoryColors[category] || "bg-gray-600";

  return (
    <Link to={`blog/${slug}/${id}`}>
      <article className="flex transform transition-transform duration-300 hover:scale-105 flex-col justify-between h-full p-3 dark:border-white rounded-lg shadow-lg shadow-gray-700 dark:bg-gray-900">
        <div className="w-full flex justify-center items-center rounded-lg bg-gray-100 overflow-hidden">
          <img
            className="w-full h-48 md:h-60 lg:h-52 object-cover"
            src={image}
            alt="blog read"
          />
        </div>
        <div className="flex dark:text-white gap-2 text-sm text-gray-600 mt-4">
          <span>
            {new Date(date)
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })
              .replace(",", ",\u00A0")}
          </span>
          <span
            className={`font-medium ${catColor} rounded-lg px-2 text-white`}
          >
            {category}
          </span>
        </div>
        <div className="flex flex-col justify-start mt-4">
          <h3 className="text-lg md:text-xl dark:text-white font-semibold leading-6 text-gray-900">
            {blogTitle}
          </h3>
          <div className="mt-2 dark:text-white text-sm md:text-base leading-6 text-gray-600 line-clamp-3">
            <Markdown
              options={{
                overrides: {
                  p: {
                    component: "div", // replace <p> with <div> to prevent invalid nesting
                  },
                  ol: {
                    component: "ul", // you might need to handle this differently
                  },
                  ul: {
                    component: "ul", // ensure proper formatting
                  },
                },
              }}
            >
              {description}
            </Markdown>
          </div>
        </div>
        <Link to={`/writer/${user?._id}`}>
          <div className="mt-5 flex items-center gap-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={profileImg}
              alt="profile"
            />
            <div className="text-sm flex flex-col">
              <p className="font-semibold text-base">{name}</p>
              <p className="dark:text-white text-gray-800 text-sm leading-6">
                {role}
              </p>
            </div>
          </div>
        </Link>
      </article>
    </Link>
  );
};

export default BlogCard;

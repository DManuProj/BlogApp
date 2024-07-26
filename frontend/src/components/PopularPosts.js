import React from "react";
import { Link } from "react-router-dom";

const categoryColors = {
  EDUCATION: "bg-blue-600",
  CODING: "bg-green-600",
  NEWS: "bg-yellow-600",
  SPORTS: "bg-purple-600",
  Entertainment: "bg-red-600",
};

const PopularPosts = ({ posts }) => {
  const Card = ({ post }) => {
    const catColor = categoryColors[post?.category] || "bg-gray-600";

    return (
      <div className="flex gap-5 w-full  items-center justify-center ">
        <img
          src={post?.img}
          alt={post?.user?.name}
          className="w-12 h-12 rounded-full border object-cover"
        />
        <div className="w-full flex flex-col gap-1 px-2">
          <span
            className={`w-fit rounded-lg p-2 py-0.5 text-[12px] text-white  2xl:text-sm ${catColor} dark:text-white`}
          >
            {post?.category}
          </span>
          <Link
            to={`/blog/${post?.slug}/${post?._id}`}
            className="text-black dark:text-white"
          >
            {post?.title}
          </Link>
          <div className="flex-col text-sm">
            <span className="text-gray-500">
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center  md:justify-end md:items-end   ">
      <p className="text-xl font-bold -mb-3 text-gray-600 dark:text-white">
        Popular Articles
      </p>
      <div className="flex justify-center md:w-52 items-center flex-col gap-12">
        {posts?.map((post, id) => (
          <Card post={post} key={id} />
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;

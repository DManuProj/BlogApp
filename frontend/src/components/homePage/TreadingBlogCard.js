import React from "react";
import { Link } from "react-router-dom";
import { usePopularPosts } from "../../hooks/postHook";
import LoadingSpinner from "../LoadingSpinner";

const TreadingBlogCard = () => {
  const { popularPosts, isLoading } = usePopularPosts();

  return (
    <div className="mt-10  flex flex-col justify-center items-center ">
      <div>
        <h2 className="font-bold  container text-center mb-20 px-2 lg:p-0 md:p-0 xl:p0 2xl:p-0  text-4xl md:text-5xl  ">
          What is Trending ?
        </h2>
        <article className="flex cursor-pointer  flex-col xl:flex-row p-2 lg:p-0 md:p-0 xl:p-0 2xl:p-0 gap-10">
          {popularPosts?.map(({ createdAt, slug, user, _id, title, img }) => (
            <div
              key={_id}
              className="relative transform transition-transform duration-300 hover:scale-105 shadow-xl shadow-gray-700 h-80 w-full xl:w-1/3 rounded-2xl flex flex-col justify-end px-4 py-3 bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              <Link to={`blog/${slug}/${_id}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80  to-sky-700/0 rounded-lg"></div>

                {/* Gradient overlay with opacity */}
                <div className="relative z-10 flex items-center text-sm  md:text-sm lg:text-xs text-gray-300 mb-2">
                  <span className="xl:w-36 w-36">
                    {new Date(createdAt)
                      .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                      .replace(",", ",\u00A0")}
                  </span>
                  <div className="flex items-center w-full lg:gap-2 gap-3">
                    <img
                      className="rounded-full object-cover h-8 w-8 xl:h-6 xl:w-6"
                      src={user.image}
                      alt="profile"
                    />
                    <p className="text-white">{user.name}</p>
                  </div>
                </div>
                <h3 className="relative mb-3 sm:mb-0 z-10 h-8 text-xl xl:text-lg font-semibold leading-6 text-white group-hover:text-gray-300">
                  {title}
                </h3>
              </Link>
            </div>
          ))}
        </article>
      </div>

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TreadingBlogCard;

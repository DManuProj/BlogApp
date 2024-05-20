import React from 'react';
import images from '../assets';

const BlogCard = ({ date, category, blogTitle, description, profileImg, name, role }) => {
    return (
        <article className="flex flex-col  justify-between h-full border">
        <div className="w-full flex justify-center items-center rounded-2xl bg-gray-100">
            <img
                className="  h-80  w-80 2xl:h-60 2xl:w-60 md:h-auto md:w-full rounded-2xl bg-gray-100 object-cover"
                src={profileImg}
                alt="blog read"
            />
        </div>
            <div className="flex gap-4 text-sm text-gray-600 mt-4">
                <span>{date}</span>
                <span className="font-medium">{category}</span>
            </div>
            <div className="flex flex-col justify-start mt-4">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">{blogTitle}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
            </div>
            <div className="mt-5 flex items-center gap-6">
                <img className="h-10 w-10 rounded-full" src={profileImg} alt="profile" />
                <div className="text-sm flex flex-col">
                    <p className="font-semibold text-base">{name}</p>
                    <p className="text-gray-800 text-sm leading-6">{role}</p>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;

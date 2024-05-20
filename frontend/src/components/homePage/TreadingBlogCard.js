import React from "react";
import images from "../../assets";

const TreadingBlogCard = () => {
  const maxLength = 90; // Maximum number of characters

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + ".....";
    }
    return text;
  };

  const loremIpsum =
    " Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.";

  const treadingBlogs = [
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

  return (
    <div className="mt-10">
      <h2 className=" container text-center mb-10 px-2 lg:p-0 md:p-0 xl:p0 2xl:p-0  text-4xl md:text-5xl">
        What is Trending ?
      </h2>
      <article className="flex flex-col xl:flex-row p-2 lg:p-0 md:p-0 xl:p-0 2xl:p-0 gap-10">
        {treadingBlogs.map(
          ({ date, category, name, heading, body, role, profileImg }) => (
            <div
              key={heading}
              className="relative h-96 w-full xl:w-1/3 border rounded-2xl flex flex-col justify-end px-4 py-3 bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `url(${images.Reading})`,
                backgroundSize: "cover",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sky-700/15 to-black/95 rounded-lg"></div>{" "}
              {/* Gradient overlay with opacity */}
              <div className="relative z-10 flex items-center text-sm  md:text-sm lg:text-xs text-gray-300 mb-2">
                <span className="xl:w-36 w-36">{date}</span>
                <div className="flex items-center w-full lg:gap-2 gap-3">
                  <img
                    className="xl:size-6 size-8 rounded-full"
                    src={profileImg}
                    alt="profile"
                  />
                  <p className="text-white te">{name}</p>
                </div>
              </div>
              <h3 className="relative mb-3 sm:mb-0 z-10 h-8 text-xl xl:text-lg font-semibold leading-6 text-white group-hover:text-gray-300">
                {heading}
              </h3>
            </div>
          )
        )}
      </article>

      
    </div>
  );
};

export default TreadingBlogCard;

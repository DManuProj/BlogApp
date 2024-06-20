import React from "react";

const Button = ({ name, color = "blue", size = "sm" }) => {
  // Define Tailwind CSS classes for different sizes
  const sizeClasses = {
    sm: "px-3 py-2 text-base",
    md: "px-4 py-2 text",
    lg: "px-6 py-3 text-lg",
  };

  // Define the button color class based on the color prop
  const colorVariants = {
    blue: "bg-blue-600  hover:bg-blue-500 text-white ",
    red: "bg-red-600 hover:bg-red-500 text-white",
    green: "bg-green-600 hover:bg-green-500 text-white",
    yellow: "bg-yellow-600 hover:bg-yellow-500 text-black",
    black: "bg-black hover:bg-gray-800 text-white",
  };

  return (
    <button
      className={` text- flex items-center justify-center rounded-xl  font-semibold ${colorVariants[color]} ${sizeClasses[size]}`}
    >
      {name}
    </button>
  );
};

export default Button;

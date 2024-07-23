import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col   sm:flex-row w-full py-8 items-center justify-between text-sm text-gray-700 dark:text-white">
      <p className="mb-4 md:mb-0">© 2024 DHive blogs. All rights reserved.</p>
      <div className="flex flex-col md:flex-row gap-5">
        <Link to="/contact" className="hover:text-blue-500">
          Contact
        </Link>
        <Link to="/" className="hover:text-blue-500">
          Terms of Service
        </Link>
        <a
          href="/"
          className="hover:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Footer;

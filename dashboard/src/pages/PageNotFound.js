import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFoundPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-medium text-gray-700 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.<br>{error}</br>
        </p>

        <Link
          to="/"
          replace={true}
          className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

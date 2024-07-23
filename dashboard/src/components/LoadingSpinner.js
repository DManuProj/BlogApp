import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <CircularProgress size="5rem" className="text-white" />
    </div>
  );
};

export default LoadingSpinner;

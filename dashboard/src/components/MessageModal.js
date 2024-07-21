import { Button } from "@mui/material";
import React from "react";

const MessageModal = ({ isOpen, title, message, closeModal, image = null }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex text-black items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg z-50">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-center my-4">
          <img src={image} alt="Expire" className="w-24 h-24" />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button
            onClick={closeModal}
            className="bg-slate-600 text-white px-8 py-1.5 rounded-full text-center outline-none"
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;

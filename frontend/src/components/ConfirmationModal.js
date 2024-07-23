import React from "react";
import Button from "./Button";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex text-black items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onCancel}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.293 2.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <Button
            label="Confirm"
            styles="bg-red-600 text-white px-8 py-2.5 rounded-full text-center outline-none"
            onClick={onConfirm}
          />

          <Button
            label="Cancel"
            styles="bg-slate-600 text-white px-8 py-1.5 rounded-full text-center outline-none"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

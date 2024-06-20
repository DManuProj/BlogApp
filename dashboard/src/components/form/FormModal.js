import React from "react";
import { IoMdClose } from "react-icons/io";

const FormModal = ({ children, title, height, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative bg-white rounded-2xl shadow-lg px-4  py-4 h-auto w-96`}
      >
        <div className=" flex content-center mb-4 justify-between items-center ">
          <h4 className="text-xl font-semibold">{title}</h4>
          <button
            onClick={onClose}
            className="  text-gray-600 hover:text-gray-900 text-xl"
          >
            <IoMdClose />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default FormModal;

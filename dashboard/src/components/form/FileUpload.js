import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { Button, Typography, IconButton } from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiImageAddFill } from "react-icons/ri";
import Skeleton from "@mui/material/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import { deleteFile } from "../../util";

const FileInput = ({
  name,
  setFieldValue,
  setFile,
  fileURL,
  isFileUploaded,
  setIsFileUploaded,
}) => {
  const [field, meta] = useField(name);
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    setFile(file);
    setFieldValue(name, file);

    if (file && ["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setIsFileUploaded(0);
    }
  };

  const handleRemove = () => {
    // setFieldValue(name, null);
    // setPreview(null);
    // setIsFileUploaded(0);
    if (fileURL) {
      deleteFile(fileURL)
        .then(() => {
          setFieldValue(name, null);
          setPreview(null);
          setIsFileUploaded(0);
        })
        .catch((error) => {
          console.error("Error removing file:", error);
        });
    }
  };

  useEffect(() => {
    if (isFileUploaded === 100) {
      toast.success("Profile pic added successfully!");
    }
  }, [isFileUploaded]);

  return (
    <div>
      <input
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        onChange={handleChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input">
        {!preview ? (
          //   <Button component="span">
          //     <RiImageAddFill />
          //   </Button>

          <IconButton component="span" className="flex justify-center ">
            <RiImageAddFill className="size-20" />
          </IconButton>
        ) : (
          <Button component="span">Changes</Button>
        )}
      </label>
      {meta.touched && meta.error ? (
        <p className="text-red-600 px-3 text-xs font-medium font-Poppins">
          {meta.error}
        </p>
      ) : null}
      {preview && isFileUploaded === 100 && (
        <div className=" mt-1 flex items-start justify-center ">
          <img
            src={preview}
            alt="Preview"
            className={`rounded-full w-28 h-28 object-cover `}
            // className={`rounded-full w-28 h-28 object-cover ${
            //   isFileUploaded < 100 && `bg-gray-500`
            // }`}
          />

          <IconButton onClick={handleRemove}>
            <RiCloseCircleLine className="absolute" />
          </IconButton>
        </div>
      )}
      {preview && isFileUploaded < 100 && (
        <div className=" mt-1 flex items-start justify-center ">
          <Skeleton variant="circular" className="w-28 h-28  mr-7" />
        </div>
      )}
      {/* <div className=" mt-1 flex items-start justify-center ">
        <Skeleton variant="circular" className="w-28 h-28 mr-7" />
      </div> */}
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default FileInput;

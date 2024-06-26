import React, { useEffect, useState } from "react";
import { Button, FormControl, Grid, MenuItem, Typography } from "@mui/material";
import Select from "../components/form/SelectUI";
import ReactQuill, { Quill } from "react-quill";
import { createSlug, uploadFile } from "../util/index";
import { BiImages } from "react-icons/bi";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextfieldUI from "../components/form/TextfieldUI";
import LoadingSpinner from "../components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import useHttpRequest from "../hooks/useHttpRequest";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const { user, isDarkMode } = useSelector((state) => state.user);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState(null);
  const [clickedAddImage, setClickedAddImage] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const { isLoading, sendRequest } = useHttpRequest();

  const INITIAL_VALUES = {
    title: "",
    category: "",
    description: "",
    img: null,
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    img: Yup.mixed()
      .required("Post Image is required")
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      ),
  });

  useEffect(() => {
    if (isFileUploaded === 100) {
      toast.success("Photo added successfully!");
    }
  }, [isFileUploaded]);
  useEffect(() => {
    if (file) {
      uploadFile(setFileURL, file, setIsFileUploaded);
    } else {
      setFileURL("");
    }
  }, [file]);
  const submitHandler = async (values) => {
    const slug = createSlug(values.title);
    const updatedForm = {
      ...values,
      img: fileURL,
      slug,
    };
    console.log(updatedForm);

    try {
      await sendRequest("POST", "posts/create-post", updatedForm, {
        Authorization: `Bearer ${user.token}`,
      });
    } catch (error) {
      console.log(error);
    }
    // Further submission logic here
  };

  const toolbar = [
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
    ["clean"],
    [
      {
        color: [
          "#25262b",
          "#868e96",
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#12b886",
          "#40c057",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ],
      },
    ],
  ];

  return (
    <>
      <Typography
        variant="h6"
        className="text-slate-700 dark:text-white font-semibold"
        gutterBottom
      >
        Create a Post
      </Typography>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="w-full dark:text-white flex md:flex-row flex-wrap gap-5 mb-8">
              <TextfieldUI
                placeholder="Enter Post Title"
                name="title"
                fullWidth={false}
                className="lg:flex-1 dark:text-white "
              />

              <Select
                name="category"
                label="Category"
                size="small"
                className="w-32"
                options={["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION"]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${isDarkMode ? "white" : ""}`,
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: `${isDarkMode ? "white" : ""}`,
                  },
                  "& .MuiSelect-icon": {
                    color: `${isDarkMode ? "white" : ""}`,
                  },
                }}
              />

              <label
                className="flex items-center gap-1 text-base cursor-pointer"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  name="img"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFieldValue("img", e.target.files[0]);
                  }}
                  className="hidden"
                  id="imgUpload"
                  data-max-size="5120"
                  accept=".jpg, .png, .jpeg"
                />
                <BiImages />
                <span>Post Image</span>
              </label>
            </div>

            <div className="flex flex-col h-2/4 ">
              <ReactQuill
                name="description"
                value={values.description}
                onChange={(content) => setFieldValue("description", content)}
                placeholder="Write your post content here..."
                className="mb-6 h-40 dark:text-white "
                theme="snow"
                modules={{ toolbar }}
              />

              <div className="w-full flex items-end justify-end mt-8">
                <Button
                  type="submit"
                  variant="contained"
                  className=" dark:bg-white  dark:text-slate-900 text-lg"
                >
                  Create Post
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {isLoading && <LoadingSpinner />}

      <Toaster position="bottom-right" />
    </>
  );
};

export default CreatePost;

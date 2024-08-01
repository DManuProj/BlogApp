import React, { useEffect, useState, useRef } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import Select from "../components/form/SelectUI";
import ReactQuill from "react-quill";
import { createSlug, uploadFile, deleteFile } from "../util/index";
import { BiImages } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import TextfieldUI from "../components/TextfieldUI";
import LoadingSpinner from "../components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import useHttpRequest from "../hooks/useHttpRequest";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const { user, isDarkMode } = useSelector((state) => state.user);
  const { postId } = useParams();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const [preview, setPreview] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    description: "",
    img: null,
  });
  const { isLoading, sendRequest } = useHttpRequest();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  // Fetch post data if postId is present
  useEffect(() => {
    if (postId) {
      const fetchPostData = async () => {
        try {
          const response = await sendRequest("GET", `posts/${postId}`, null, {
            Authorization: `Bearer ${user.token}`,
          });
          if (response.success) {
            const { title, category, description, img } = response.data;
            setInitialValues({
              title,
              category,
              description,
              img,
            });
            setInitialImage(img);
            setPreview(img);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchPostData();
    }
  }, [postId, sendRequest, user.token]);

  const handleChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (!file) {
      return; // Do nothing if no file is selected
    }

    setFile(file);
    setFieldValue("img", file);

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

  const handleRemove = async (setFieldValue) => {
    if (fileURL) {
      try {
        await deleteFile(fileURL);
        setFieldValue("img", null);
        setPreview(initialImage);
        setIsFileUploaded(0);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the input value
        }
      } catch (error) {
        console.error("Error removing file:", error);
      }
    }
  };

  const handleFormSubmit = async (values) => {
    const slug = createSlug(values.title);
    const updatedForm = {
      ...values,
      img: fileURL || initialImage,
      slug,
    };
    try {
      const endpoint = postId
        ? `posts/update-post/${postId}`
        : "posts/create-post";
      const method = postId ? "PATCH" : "POST";
      const result = await sendRequest(method, endpoint, updatedForm, {
        Authorization: `Bearer ${user.token}`,
      });

      if (result.success) {
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
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
        {postId ? "Update Post" : "Create a Post"}
      </Typography>
      {user.isEmailVerified ? (
        <Formik
          initialValues={initialValues}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleFormSubmit}
          enableReinitialize
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
                    onChange={(e) => handleChange(e, setFieldValue)}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                    ref={fileInputRef}
                  />
                  <BiImages />
                  <span>Post Image</span>
                </label>
              </div>
              <div className="mb-5">
                {preview && (
                  <div className="mt-1 flex items-start justify-center ">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-auto h-28 object-cover flex border-white border mr-3"
                    />
                    {preview !== initialImage && (
                      <IconButton onClick={() => handleRemove(setFieldValue)}>
                        <RiCloseCircleLine className="absolute dark:text-white" />
                      </IconButton>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col h-2/4  ">
                <ReactQuill
                  name="description"
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                  placeholder="Write your post content here..."
                  className="mb-6 h-40 dark:text-white "
                  theme="snow"
                  modules={{ toolbar }}
                />
              </div>
              <div className="w-full flex items-end justify-end mt-8">
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  className="bg-gray-800 font-bold text-lg dark:bg-white  dark:text-black rounded-3xl"
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : postId ? (
                    "Update Post"
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Typography className="text-red-500">
          Please verify your email to create a post.
        </Typography>
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default CreatePost;

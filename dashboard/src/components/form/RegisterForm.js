import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import TextfieldUI from "../TextfieldUI";
import FileInput from "./FileUpload";
import useHttpRequest from "../../hooks/useHttpRequest";
import * as Yup from "yup";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-hot-toast";
import { uploadFile } from "../../util";
import { setIsLoading, setUserData } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Divider from "../Divider";
import { FaArrowLeft } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import { googleSignUp } from "../../api/authApi";

const RegisterForm = ({ setCurrentForm }) => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [error, setError] = useState(null);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      uploadFile(setFileURL, file, setIsFileUploaded);
    } else {
      setFileURL("");
    }
  }, [file]);

  const INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    image: null,
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain an uppercase letter")
      .matches(/[a-z]/, "Password must contain a lowercase letter")
      .matches(/[0-9]/, "Password must contain a number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain a special character"
      )
      .min(5, "Password must be at least 5 characters"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    role: Yup.string().required("Role Name is required"),
    image: Yup.mixed()
      .required("Profile Image is required")
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 5) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20;
    return score;
  };

  const getProgressBarColor = (score) => {
    if (score === 0) return "transparent";
    if (score < 20) return "bg-red-500";
    if (score < 40) return "bg-red-500";
    if (score < 60) return "bg-red-500";
    if (score <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleFormatSubmit = async (values) => {
    const updatedForm = {
      ...values,
      image: fileURL,
      accountType: "Writer",
    };

    try {
      const result = await sendRequest("POST", "auth/register", updatedForm);
      const user = result.user;
      const token = result.token;

      if (result.success) {
        setTimeout(() => {
          dispatch(setUserData({ user, token }));
        }, 3000);
      }
    } catch (error) {
      console.error("Request failed:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(setIsLoading(true));

      const result = await googleSignUp(tokenResponse.access_token);

      if (result.success) {
        dispatch(setIsLoading(false));
        dispatch(setUserData(result));
        setTimeout(() => {
          window.history.back();
        }, 1500);
        toast.success(result.message);
      } else {
        dispatch(setIsLoading(false));
        toast.error(result.message || "Something went wrong");
      }
    },
  });

  return (
    <>
      {showForm ? (
        <Box>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={FORM_VALIDATION}
            onSubmit={handleFormatSubmit}
          >
            {({ setFieldValue, values }) => {
              const passwordStrength = getPasswordStrength(values.password);
              const progressBarColor = getProgressBarColor(passwordStrength);
              return (
                <Form className="flex flex-col gap-4 dark:text-white">
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <div>
                        <p>First Name*</p>
                        <TextfieldUI name="firstName" />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <p>Last Name*</p>
                        <TextfieldUI name="lastName" />
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    <p>Role*</p>
                    <TextfieldUI name="role" />
                  </div>
                  <div>
                    <p>Email*</p>
                    <TextfieldUI name="email" />
                  </div>
                  <div>
                    <p>Password*</p>
                    <TextfieldUI type="password" name="password" />
                    <div className="w-full h-2 mt-1 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${getProgressBarColor(
                          getPasswordStrength(values.password)
                        )}`}
                        style={{
                          width: `${getPasswordStrength(values.password)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p>Profile Image*</p>
                    <FileInput
                      name="image"
                      setFieldValue={setFieldValue}
                      value={values.image}
                      setFile={setFile}
                      fileURL={fileURL}
                      isFileUploaded={isFileUploaded}
                      setIsFileUploaded={setIsFileUploaded}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    className="bg-gray-800 font-bold text-lg dark:bg-white dark:text-black rounded-3xl"
                  >
                    Sign Up
                  </Button>
                  {isLoading && <LoadingSpinner />}
                </Form>
              );
            }}
          </Formik>

          {/* {error && <Typography color="error">{error}</Typography>} */}
          <p className="p-2 dark:text-white">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentForm("login")}
              className="text-blue-700 cursor-pointer"
            >
              SignIn
            </span>
          </p>

          <p className="p-2 dark:text-white flex gap-2">
            <FaArrowLeft
              className="text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400 mr-2"
              onClick={() => setShowForm(false)}
            />
            Go Back
          </p>
        </Box>
      ) : (
        <div className="h-56  flex flex-col justify-center ">
          <Button
            onClick={handleGoogleSignup}
            startIcon={<FcGoogle className="text-2xl" />}
            className="w-full mb-5  flex justify-center text-lg font-bold bg-gray-800 text-white  items-center gap-4 dark:bg-white dark:text-black  rounded-full "
          >
            Sign Up with Google
          </Button>
          <Divider label="or sign in with email" />
          <Button
            // startIcon={<FcGoogle className="text-2xl" />}
            onClick={() => setShowForm(true)}
            className="w-full flex mt-9 justify-center text-lg font-bold bg-gray-800 text-white  items-center gap-4 dark:bg-white dark:text-black  rounded-full "
          >
            Continue with E-mail
          </Button>
          <p className="p-2 dark:text-white">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentForm("login")}
              className="text-blue-700 cursor-pointer"
            >
              SignIn
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default RegisterForm;

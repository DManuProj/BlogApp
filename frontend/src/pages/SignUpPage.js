import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserData } from "../store/userSlice";
import { emailSignUp, getGoogleSignUp } from "../apis/authApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { uploadFile } from "../util/index";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FileInput from "../components/FileUpload";
import TextfieldUI from "../components/TextFeildUI";
import AuthLayout from "./AuthLayout";

const SignUpPage = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  useEffect(() => {
    if (user) {
      if (user.token && !user.emailVerified) {
        navigate("/otp-verification");
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (file) {
        uploadFile(setFileURL, file, setIsFileUploaded);
      } else {
        setFileURL("");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }, [file]);

  const INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    image: Yup.mixed()
      .required("Profile Image is required")
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const handleSubmit = async (values) => {
    dispatch(setIsLoading(true));

    try {
      const result = await emailSignUp({ ...values, image: fileURL });
      if (result.success) {
        dispatch(setIsLoading(false));
        dispatch(setUserData(result));
        setTimeout(() => {
          navigate("/otp-verification", { state: { from: location } });
        }, 3000);
        toast.success(result.message);
      } else {
        dispatch(setIsLoading(false));
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(setIsLoading(true));

      const result = await getGoogleSignUp(tokenResponse.access_token);

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

  return (
    <AuthLayout>
      {/* Left Column (Sidebar for larger screens) */}

      <div className="h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md w-full space-y-6">
          <div className="flex justify-center items-center  w-full py-6">
            {showForm && (
              <IoArrowBackCircleSharp
                className="text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400 mr-2"
                onClick={() => setShowForm(false)}
              />
            )}

            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign up for an account
            </h2>
          </div>
          {showForm ? (
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ setFieldValue, values }) => {
                return (
                  <Form className="max-w-md dark:text-white w-full mt-8 space-y-6">
                    <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-6 mb-8">
                      <div className="w-full flex gap-4">
                        <div>
                          <p>First Name*</p>
                          <TextfieldUI name="firstName" />
                        </div>
                        <div>
                          <p>Last Name*</p>
                          <TextfieldUI name="lastName" />
                        </div>
                      </div>

                      <div>
                        <p>Email*</p>
                        <TextfieldUI name="email" />
                      </div>

                      <div className="relative">
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

                      <div className="flex  flex-col py-4">
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
                      {/* <BiImages />
                            <span>Picture</span> */}
                    </div>
                    <div className=" -mt-5">
                      <Button
                        label="Create Account"
                        type="submit"
                        styles="w-full sm:text-lg py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-slate-950 dark:bg-sky-500 hover:bg-sky-700 focus:outline-none  -mt-15"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <>
              <Button
                onClick={() => googleSignup()}
                icon={<FcGoogle className="size-6" />}
                label="Sign Up with Google"
                styles="w-full flex justify-center items-center gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300"
              />
              <Divider label="OR" />
              <Button
                onClick={() => setShowForm(true)}
                label="Continue with email"
                className="dark:hover:bg-transparent"
                styles="w-full gap-4 bg-white text-black dark:bg-sky-500 hover:bg-transparent dark:hover:bg-sky-700 dark:text-white px-5 py-2.5 rounded-full border dark:border-none border-gray-300"
              />

              <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="dark:text-sky-500 font-semibold underline ml-1"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </AuthLayout>
  );
};

export default SignUpPage;

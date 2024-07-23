import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Button from "../components/Button";
import TextfieldUI from "../components/TextFeildUI";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserData } from "../store/userSlice";

import { resetPassword } from "../apis/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgetPasswordPage = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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

  const handleSubmit = async (values) => {
    dispatch(setIsLoading(true));

    const { email, confirmPassword } = values;
    const data = { email, confirmPassword };

    try {
      const result = await resetPassword(data);
      console.log("result", result);

      const user = result.user;
      const token = result.token;

      if (result.success) {
        dispatch(setIsLoading(false));
        dispatch(setUserData({ user, token }));
        toast.success(result.message);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        dispatch(setIsLoading(false));
        toast.error(result.message);
      }

      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <AuthLayout>
      <div className="h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
        {/* <div className="flex w-full mb-10 md:hidden justify-center bg-red-600">
            <img src={Logo} alt="logo" className="w-1/2" />
          </div> */}

        <div className="max-w-md w-full space-y-5">
          <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Create a New Password
          </h2>

          <Divider />
          <Formik
            initialValues={{
              email: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              newPassword: Yup.string()
                .required("Password is required")
                .matches(/[A-Z]/, "Password must contain an uppercase letter")
                .matches(/[a-z]/, "Password must contain a lowercase letter")
                .matches(/[0-9]/, "Password must contain a number")
                .matches(
                  /[!@#$%^&*(),.?":{}|<>]/,
                  "Password must contain a special character"
                )
                .min(5, "Password must be at least 5 characters"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values }) => {
              return (
                <Form className="mt-8 space-y-6 dark:text-white cursor-pointer">
                  <div className="flex flex-col gap-5 ">
                    <div className="gap-3 ">
                      <p>Email*</p>
                      <TextfieldUI name="email" />
                    </div>
                    <div className="gap-3 ">
                      <p>Password*</p>
                      <TextfieldUI
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        icon={
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="focus:outline-none"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        }
                      />
                      <div className="w-full h-2 mt-1 rounded-lg overflow-hidden">
                        <div
                          className={`h-full ${getProgressBarColor(
                            getPasswordStrength(values.newPassword)
                          )}`}
                          style={{
                            width: `${getPasswordStrength(
                              values.newPassword
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="gap-3 ">
                      <p>Confirm Password*</p>
                      <TextfieldUI
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                      />
                    </div>
                  </div>

                  <Button
                    label="Reset Password"
                    type="submit"
                    styles="w-full py-2.5 2xl:py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-black dark:bg-rose-800 hover:bg-rose-700 focus:outline-none  mt-8"
                  />
                </Form>
              );
            }}
          </Formik>

          <div className="flex flex-col ml-2 text-gray-600  dark:text-gray-300">
            <p>
              Sign In Instead ?
              <Link
                to="/login"
                replace
                className="text-rose-800 font-medium ml-3 "
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </AuthLayout>
  );
};

export default ForgetPasswordPage;

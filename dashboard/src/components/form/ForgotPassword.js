import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik, Form } from "formik";
import TextField from "../TextfieldUI";
import useHttpRequest from "../../hooks/useHttpRequest";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/userSlice";
import LoadingSpinner from "../LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const ForgotPassword = ({ setCurrentForm, user, currentForm }) => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    email: "",
    newPassword: "",
    confirmPassword: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
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
  });

  const submitHandler = async (values) => {
    try {
      const data = await sendRequest("PUT", "users/reset-password", values);
      const user = data.user;
      const token = data.token;

      setTimeout(() => {
        dispatch(setUserData({ user, token }));
      }, 3000);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    <Box>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-5 dark:text-fuchsia-50">
            <div className="flex flex-col gap-3 ">
              <div>
                <p>Email*</p>
                <TextField name="email" />
              </div>
              <div>
                <p>Password*</p>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="dark:text-fuchsia-50"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="w-full h-2 mt-1 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${getProgressBarColor(
                      getPasswordStrength(values.newPassword)
                    )}`}
                    style={{
                      width: `${getPasswordStrength(values.newPassword)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <p>Confirm Password*</p>
                <TextField type="password" name="confirmPassword" />
              </div>
            </div>

            <Button
              type="submit"
              size="medium"
              variant="contained"
              className="bg-sky-600 font-bold text-lg dark:bg-white dark:text-black rounded-xl"
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>

      {currentForm === "login" && (
        <div className="flex flex-col px-2 gap-2 mt-5">
          <p className=" dark:text-fuchsia-50">
            Don't have an account ?{" "}
            <span
              onClick={() => setCurrentForm("login")}
              className="text-blue-700 cursor-pointer"
            >
              SignIn
            </span>
          </p>
          <p className=" dark:text-fuchsia-50">
            Forgot Password?{" "}
            <span
              onClick={() => setCurrentForm("forgetPassword")}
              className="text-blue-700 cursor-pointer"
            >
              Reset Here
            </span>
          </p>
        </div>
      )}

      {currentForm === "forgetPassword" && (
        <p className="mt-5 px-2 dark:text-fuchsia-50">
          Back to login ?{" "}
          <span
            onClick={() => setCurrentForm("login")}
            className="text-blue-700 cursor-pointer"
          >
            SignIn
          </span>
        </p>
      )}

      <Toaster position="bottom-right" reverseOrder={false} />
      {isLoading && <LoadingSpinner />}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ForgotPassword;

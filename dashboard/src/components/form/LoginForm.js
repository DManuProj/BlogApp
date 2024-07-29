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
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setCurrentForm, user }) => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitHandler = async (values) => {
    try {
      const result = await sendRequest("POST", "auth/login", values);
      const user = result.user;
      const token = result.token;

      if (result.success) {
        setTimeout(() => {
          dispatch(setUserData({ user, token }));
          navigate("/dashboard/home", { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-5 dark:text-fuchsia-50">
            <div>
              <p>Email*</p>
              <TextField name="email" />
            </div>
            <div>
              <p>Password*</p>
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="dark:text-fuchsia-50"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Button
              type="submit"
              size="medium"
              variant="contained"
              className="bg-gray-800 font-bold text-lg dark:bg-white dark:text-black rounded-3xl"
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <p className="p-2 dark:text-fuchsia-50">
        Don't have an account?{" "}
        <span
          onClick={() => setCurrentForm("register")}
          className="text-blue-700 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
      <p className="p-2 dark:text-fuchsia-50">
        Forgot Password?{" "}
        <span
          onClick={() => setCurrentForm("forgetPassword")}
          className="text-blue-700 cursor-pointer"
        >
          Reset Here
        </span>
      </p>
      <Toaster position="bottom-right" reverseOrder={false} />
      {isLoading && <LoadingSpinner />}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default LoginForm;

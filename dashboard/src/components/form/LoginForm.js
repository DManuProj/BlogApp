import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "./TextfieldUI";
import useHttpRequest from "../../hooks/useHttpRequest";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/userSlice";
import LoadingSpinner from "../LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const LoginForm = ({ setIsSignIn, user }) => {
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
    console.log(values);
    try {
      const data = await sendRequest("POST", "auth/login", values);
      const user = data.user;
      const token = data.token;
      console.log("Data ", data);

      setTimeout(() => {
        dispatch(signIn({ user, token }));
        // window.location.replace("/dashboard");
        navigate("/dashboard", { replace: true });
      }, 3000);
    } catch (error) {
      console.error("Request failed:", error);
      // const errorMessage = error.response?.data?.message || error.message;
      // setError(errorMessage);
      // toast.error(errorMessage);
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
          <Form className="flex flex-col gap-5">
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
              variant="contained"
              className=" bg-slate-900 text-lg"
            >
              SignIn
            </Button>
          </Form>
        )}
      </Formik>
      <p className="p-2">
        Don't have an account?{" "}
        <span
          onClick={() => setIsSignIn((prev) => !prev)}
          className="text-blue-700 cursor-pointer"
        >
          SignUp
        </span>
      </p>
      <Toaster position="bottom-right" reverseOrder={false} />
      {isLoading && <LoadingSpinner />}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default LoginForm;

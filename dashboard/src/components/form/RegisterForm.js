import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid, LinearProgress } from "@mui/material";
import { Formik, Form } from "formik";
import TextfieldUI from "../TextfieldUI";
import FileInput from "./FileUpload";
import useHttpRequest from "../../hooks/useHttpRequest";
import * as Yup from "yup";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-hot-toast";
import { uploadFile } from "../../util";
import { setUserData } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setCurrentForm }) => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [error, setError] = useState(null);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(0);

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
    if (score < 20) return "error";
    if (score < 40) return "error";
    if (score < 60) return "warning";
    if (score < 80) return "warning";
    return "success";
  };

  const submitHandler = async (values) => {
    const updatedForm = {
      ...values,
      image: fileURL,
      accountType: "Writer",
    };

    try {
      const data = await sendRequest("POST", "auth/register", updatedForm);
      const user = data.user;
      const token = data.token;
      dispatch(setUserData({ user, token }));

      setTimeout(() => {
        navigate("/otp-verification", { replace: true });
      }, 3000);
    } catch (error) {
      console.error("Request failed:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, values }) => {
          const passwordStrength = getPasswordStrength(values.password);
          const progressBarColor = getProgressBarColor(passwordStrength);
          return (
            <Form className="flex flex-col gap-4 dark:text-white">
              <Grid container xs={12} columnGap={1}>
                <Grid item xs={5.8}>
                  <div>
                    <p>First Name*</p>
                    <TextfieldUI name="firstName" />
                  </div>
                </Grid>
                <Grid item xs={5.8}>
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
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  color={
                    progressBarColor === "transparent"
                      ? "inherit"
                      : progressBarColor
                  }
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    mt: 1,
                    bgcolor:
                      progressBarColor === "transparent"
                        ? "transparent"
                        : "inherit",
                  }}
                />
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
                className="bg-sky-600 font-bold text-lg dark:bg-white dark:text-black rounded-xl"
              >
                Sign Up
              </Button>
              {isLoading && <LoadingSpinner />}
            </Form>
          );
        }}
      </Formik>
      {error && <Typography color="error">{error}</Typography>}
      <p className="p-2 dark:text-white">
        Already have an account?{" "}
        <span
          onClick={() => setCurrentForm("login")}
          className="text-blue-700 cursor-pointer"
        >
          SignIn
        </span>
      </p>
    </Box>
  );
};

export default RegisterForm;

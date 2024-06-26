//
import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid, LinearProgress } from "@mui/material";
import { Formik, Form } from "formik";
import TextfieldUI from "../components/form/TextfieldUI";
import FileInput from "../components/form/FileUpload";
import useHttpRequest from "../hooks/useHttpRequest";
import * as Yup from "yup";
import LoadingSpinner from "../components/LoadingSpinner";
import { Toaster, toast } from "react-hot-toast";
import { uploadFile } from "..//util";
import { setOTPData, signIn, updateUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [error, setError] = useState(null);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.user);

  const [change, setChange] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await sendRequest("GET", `users/get-user/${user.id}`);
        setUserData(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, [sendRequest, user.id]);

  useEffect(() => {
    if (file) {
      uploadFile(setFileURL, file, setIsFileUploaded);
    } else {
      setFileURL("");
    }
  }, [file]);

  if (!userData) {
    return <LoadingSpinner />;
  }

  const [firstName, lastName] = userData.name
    ? userData.name.split(" ")
    : ["", ""];

  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: userData.email || "",
    image: userData.image || "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    // email: Yup.string().email("Invalid email").required("Email is required"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .matches(/[A-Z]/, "Password must contain an uppercase letter")
    //   .matches(/[a-z]/, "Password must contain a lowercase letter")
    //   .matches(/[0-9]/, "Password must contain a number")
    //   .matches(
    //     /[!@#$%^&*(),.?":{}|<>]/,
    //     "Password must contain a special character"
    //   )
    //   .min(5, "Password must be at least 5 characters"),
    firstName: Yup.string().required("First Name is required"),
    image: Yup.mixed()
      .required("Profile Image is required")
      .test("fileFormat", "Unsupported Format", (value) => {
        if (typeof value === "string") {
          // Accept string values
          return true;
        }
        // Otherwise, check if it's a file and the type is supported
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }),
  });

  // const getPasswordStrength = (password) => {
  //   let score = 0;
  //   if (password.length >= 5) score += 20;
  //   if (/[A-Z]/.test(password)) score += 20;
  //   if (/[a-z]/.test(password)) score += 20;
  //   if (/\d/.test(password)) score += 20;
  //   if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20;
  //   return score;
  // };

  // const getProgressBarColor = (score) => {
  //   if (score === 0) return "transparent";
  //   if (score < 20) return "error";
  //   if (score < 40) return "error";
  //   if (score < 60) return "warning";
  //   if (score < 80) return "warning";
  //   return "success";
  // };

  const submitHandler = async (values) => {
    try {
      const data = await sendRequest("PUT", `users/update-user`, values, {
        Authorization: `Bearer ${user.token}`,
      });
      const updatedUser = data.user;
      const token = data.token;
      dispatch(updateUser({ updatedUser, token }));
      navigate(0);
    } catch (error) {
      console.log(error);
    }

    console.log("submit hamdler clicked", values);
    // const updatedForm = {
    //   ...values,
    //   image: fileURL,
    //   accountType: "Writer",
    // };
    // try {
    //   const data = await sendRequest("POST", "auth/register", updatedForm);
    //   const user = data.user;
    //   const token = data.token;
    //   dispatch(signIn({ user, token }));
    //   dispatch(setOTPData({ otpLevel: true, id: user._id }));
    //   setTimeout(() => {
    //     navigate("/otp-verification", { replace: true });
    //   }, 3000);
    // } catch (error) {
    //   const errorMessage = error.response?.data?.message || error.message;
    //   setError(errorMessage);
    //   toast.error(errorMessage);
    // }
  };
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
        enableReinitialize
      >
        {({ setFieldValue, values }) => {
          // const passwordStrength = getPasswordStrength(values.password);
          // const progressBarColor = getProgressBarColor(passwordStrength);
          return (
            <Form className="flex flex-col gap-4 dark:text-white">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <div>
                    <p>First Name*</p>
                    <TextfieldUI name="firstName" />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div>
                    <p>Last Name*</p>
                    <TextfieldUI name="lastName" />
                  </div>
                </Grid>
              </Grid>
              <div>
                <p>Email*</p>
                <TextfieldUI disabled name="email" />
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
                  previewURL={userData.image}
                />
                {/* <Button
                  onClick={() => {
                    setChange((prev) => !prev);
                  }}
                  className="cursor-pointer text-base text-blue-600 underline"
                >
                  {!change ? "Change the Photo" : "back"}
                </Button>
                {change ? (
                  <FileInput
                    name="image"
                    setFieldValue={setFieldValue}
                    value={values.image}
                    setFile={setFile}
                    fileURL={fileURL}
                    isFileUploaded={isFileUploaded}
                    setIsFileUploaded={setIsFileUploaded}
                    previewURL={userData.image}
                  />
                ) : (
                  <div className="bg-slate-600 w-full mt-1 flex justify-center  gap-3 items-center">
                    <img
                      name="image"
                      src={userData.image}
                      alt="user"
                      className="rounded-full size-32 object-cover   "
                    />
                  </div>
                )} */}
              </div>
              <Button
                type="submit"
                variant="contained"
                className="bg-slate-900 text-lg"
              >
                Signup
              </Button>
              {isLoading && <LoadingSpinner />}
            </Form>
          );
        }}
      </Formik>
      {error && <Typography color="error">{error}</Typography>}
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default SettingPage;

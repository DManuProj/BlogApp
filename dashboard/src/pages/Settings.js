//
import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import TextfieldUI from "../components/TextfieldUI";
import FileInput from "../components/form/FileUpload";
import useHttpRequest from "../hooks/useHttpRequest";
import * as Yup from "yup";
import LoadingSpinner from "../components/LoadingSpinner";
import { Toaster, toast } from "react-hot-toast";
import { uploadFile } from "..//util";
import { setUserData } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SettingPage = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.token && user.isEmailVerified) {
      navigate("/dashboard/settings");
    } else if (user?.token && !user.isEmailVerified) {
      navigate("/otp-verification", {
        replace: true,
        state: { from: "/dashboard/setting" },
      });
    }
  }, [user]);

  useEffect(() => {
    if (user.id) {
      const fetchUser = async () => {
        try {
          const data = await sendRequest("GET", `users/get-user/${user.id}`);
          setProfileData(data.data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchUser();
    }
  }, [user.id, sendRequest]);

  useEffect(() => {
    if (file) {
      uploadFile(setFileURL, file, setIsFileUploaded);
    } else {
      setFileURL("");
    }
  }, [file]);

  if (!profileData) {
    return <LoadingSpinner />;
  }

  const [firstName, lastName] = profileData.name
    ? profileData.name.split(" ")
    : ["", ""];

  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: profileData.email || "",
    image: profileData.image || "",
    role: profileData.role || "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    role: Yup.string().required("Role Name is required"),
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

  const submitHandler = async (values) => {
    try {
      const result = await sendRequest(
        "PUT",
        `users/update-user`,
        { ...values, image: fileURL || user.image },
        {
          Authorization: `Bearer ${user.token}`,
        }
      );

      if (result.success) {
        const updatedUser = result.user;
        const token = result.token;

        setTimeout(() => {
          dispatch(setUserData({ user: updatedUser, token }));
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the profile");
    }
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
                <Grid item xs={12} sm={6}>
                  <div>
                    <p>Role*</p>
                    <TextfieldUI name="role" />
                  </div>
                </Grid>
              </Grid>
              <div>
                <p>Email*</p>
                <TextfieldUI name="email" />
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
                  previewURL={profileData.image}
                />
              </div>
              <div className=" w-full flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-gray-800 font-bold text-lg dark:bg-white  dark:text-black rounded-3xl"
                >
                  Update User
                </Button>
              </div>

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

import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { uploadFile } from "../util/index";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FileInput from "../components/FileUpload";
import TextfieldUI from "../components/TextFeildUI";
import AuthLayout from "./AuthLayout";
import useHttpRequest from "../hooks/useHttpRequest";

const ProfilePage = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const { user } = useSelector((state) => state.user);
  const [isFileUploaded, setIsFileUploaded] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [usersData, setUsersData] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.token && !user.isEmailVerified) {
        navigate("/otp-verification");
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await sendRequest("GET", `users/get-user/${user.id}`);
        setUsersData(data.data);
        const [firstName, lastName] = data.data.name
          ? data.data.name.split(" ")
          : ["", ""];
        setInitialValues({
          firstName: firstName || "",
          lastName: lastName || "",
          email: data.data.email || "",
          image: data.data.image || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [sendRequest, user.id]);

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

  if (!usersData || !initialValues) {
    return <LoadingSpinner />;
  }

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
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

  const handleSubmit = async (values) => {
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
        dispatch(setUserData(result));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(user.message || "Something went wrong. Try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md w-full space-y-6">
          <div className="flex justify-center items-center  w-full py-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              User Profile
            </h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize
          >
            {({ setFieldValue, values }) => {
              const isFormDirty =
                JSON.stringify(values) !== JSON.stringify(initialValues);

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

                    <div className="flex  flex-col py-4">
                      <FileInput
                        name="image"
                        setFieldValue={setFieldValue}
                        value={values.image}
                        setFile={setFile}
                        fileURL={fileURL}
                        isFileUploaded={isFileUploaded}
                        setIsFileUploaded={setIsFileUploaded}
                        previewURL={usersData.image}
                      />
                    </div>
                  </div>

                  <Button
                    label="Update Profile"
                    type="submit"
                    styles="w-full sm:text-lg py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-slate-950 dark:bg-sky-500 hover:bg-sky-700 focus:outline-none  mt-8"
                    disabled={!isFormDirty}
                  />
                </Form>
              );
            }}
          </Formik>

          <></>
        </div>
      </div>

      <Toaster position="bottom-right" />
      {isLoading && <LoadingSpinner />}
    </AuthLayout>
  );
};

export default ProfilePage;

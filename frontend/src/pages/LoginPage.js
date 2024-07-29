import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Divider from "../components/Divider";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { emailLogin, googleSignIn } from "../apis/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserData } from "../store/userSlice";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import TextfieldUI from "../components/TextFeildUI";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { isLoading, user } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      if (user.token && !user.isEmailVerified) {
        navigate("/otp-verification");
      }
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        dispatch(setIsLoading(true));
        const result = await googleSignIn(tokenResponse.access_token);

        dispatch(setIsLoading(false));

        if (result.success) {
          dispatch(setUserData(result));
          toast.success(result.message);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1500);
        } else {
          toast.error(result.message || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSubmit = async (values) => {
    dispatch(setIsLoading(true));

    try {
      const result = await emailLogin(values);

      const user = result.user;
      const token = result.token;

      if (result.success) {
        dispatch(setUserData({ user, token }));
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        dispatch(setIsLoading(false));
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
        <div className="max-w-md w-full space-y-6">
          <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>

          <Button
            onClick={() => googleLogin()}
            icon={<FcGoogle className="size-6" />}
            label="Sign in with Google"
            styles="w-full flex justify-center items-center gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300"
          />

          <Divider label="or sign in with email" />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="mt-8 space-y-6 dark:text-white">
              <div className="flex flex-col gap-5 ">
                <div className="gap-3 ">
                  <p>Email*</p>
                  <TextfieldUI name="email" />
                </div>
                <div className="gap-3 ">
                  <p>Password*</p>
                  <TextfieldUI
                    type={showPassword ? "text" : "password"}
                    name="password"
                    icon={
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="focus:outline-none"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="dark:text-white" />
                        ) : (
                          <FaEye className="dark:text-white" />
                        )}
                      </button>
                    }
                  />
                </div>
                <Link
                  to="/forgot-password"
                  className="underline dark:text-sky-200 text-blue-600 -mt-3 text-sm"
                >
                  Forgot password ?
                </Link>
              </div>

              <Button
                label="Sign In"
                type="submit"
                styles="w-full sm:text-lg py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-slate-950 dark:bg-sky-500 hover:bg-sky-700 focus:outline-none  mt-8"
              />
            </Form>
          </Formik>

          <div className="flex flex-col ml-2 text-gray-600  dark:text-gray-300">
            <p>
              Don't have an account?
              <Link
                to="/sign-up"
                replace
                className="dark:text-sky-500 underline font-semibold  ml-3 "
              >
                Sign up
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

export default LoginPage;

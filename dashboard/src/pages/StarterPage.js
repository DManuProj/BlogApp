import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../components/form/FormModal";
import LoginForm from "../components/form/LoginForm";
import RegisterForm from "../components/form/RegisterForm";
import { signInModal } from "../store/userSlice";
import ForgetPasswordPage from "../components/form/ForgotPassword";
import { Toaster } from "react-hot-toast";

const StarterPage = () => {
  const { user, signInModalOpen, isDarkMode } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const dispatch = useDispatch();

  const [currentForm, setCurrentForm] = useState("login"); // Track the current form to display

  const handleOpenForm = () => {
    dispatch(signInModal(true));
  };

  const handleCloseForm = () => {
    dispatch(signInModal(false));
    setCurrentForm("login");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token && user.isEmailVerified) {
      navigate("/dashboard", { replace: true });
    } else if (user?.token && !user.isEmailVerified) {
      navigate("/otp-verification", {
        replace: true,
        state: { from: "/auth" },
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center  dark:bg-slate-800">
      <div className="w-full 2xl:max-w-3xl flex flex-col items-center justify-center gap-y-10">
        <span className="hidden dark:text-white text-slate-700 md:flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base">
          Unleash Your Words, Share Your World{" "}
          <Link
            to="#"
            className="flex gap-1 items-center font-semibold text-[18px]"
          >
            Join Now
            <MdArrowForward />
          </Link>
        </span>
        <h1 className="dark:text-white text-4xl text-slate-800 2xl:text-6xl font-bold text-center">
          Discover the Power of Your Imagination!
        </h1>
        <span className="dark:text-white font-sans max-w-2xl text-center text-base md:text-[18px] text-slate-600">
          Whether you're an experienced storyteller or just beginning your
          writing journey, you'll find a nurturing and inspiring community here.
          Share your narratives, connect with fellow authors, and unlock the
          full potential of your creativity with us.
        </span>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-6">
          <Button
            size="medium"
            variant="contained"
            onClick={handleOpenForm}
            className="bg-gray-800 font-bold text-lg dark:bg-white dark:text-black rounded-3xl"
          >
            Embark on Your Creative Journey
          </Button>
        </div>
      </div>
      <FormModal
        title={`${
          currentForm === "login"
            ? "Login Form"
            : currentForm === "register"
            ? "Register Form"
            : "Forget Password Form"
        }`}
        height="50%"
        open={signInModalOpen}
        onClose={handleCloseForm}
      >
        {currentForm === "login" && (
          <LoginForm setCurrentForm={setCurrentForm} user={user} />
        )}
        {currentForm === "register" && (
          <RegisterForm setCurrentForm={setCurrentForm} />
        )}
        {currentForm === "forgetPassword" && (
          <ForgetPasswordPage
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
          />
        )}
      </FormModal>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default StarterPage;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../components/form/FormModal";
import LoginForm from "../components/form/LoginForm";
import RegisterForm from "../components/form/RegisterForm";
import { signInModal } from "../store/userSlice";

const StarterPage = () => {
  const { user, isOTPLevel, signInModalOpen } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);

  const handleOpenForm = () => {
    dispatch(signInModal(true));
  };

  const handleCloseForm = () => {
    dispatch(signInModal(false));
  };

  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (user?.token) {
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <div className="w-full h-auto mt-24 flex items-center justify-center px-4 ">
      <div className="w-full 2xl:max-w-3xl flex flex-col items-center justify-center gap-y-10">
        <span className="hidden text-slate-700 md:flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base">
          Unleash Your Words, and share with others{" "}
          <Link className="flex gap-1 items-center font-semibold text-[18px]">
            Join Now
            <MdArrowForward />
          </Link>
        </span>
        <h1 className="text-4xl text-slate-800 2xl:text-6xl font-bold text-center">
          Unleash Your Creativity with Us!
        </h1>
        <span className="font-sans text-center text-base md:text-[18px] text-slate-600">
          Whether you're a seasoned author or just starting your writing
          journey, you'll find a supportive and inspiring environment here.
          Share your stories, connect with fellow writers, and unleash your
          creativity with us.
        </span>
        <div className="flex gap-6 items-center justify-center mt-6">
          <Button
            size="medium"
            variant="contained"
            onClick={handleOpenForm}
            className="bg-slate-900 rounded-xl"
          >
            Get Started
          </Button>
          <Link to="#" className="flex gap-2 items-center font-semibold">
            Contact
            <MdArrowForward />
          </Link>
        </div>
      </div>
      <FormModal
        title="Login form"
        height="50%"
        open={signInModalOpen}
        onClose={handleCloseForm}
      >
        {isSignIn ? (
          <LoginForm setIsSignIn={setIsSignIn} user={user} />
        ) : (
          <RegisterForm setIsSignIn={setIsSignIn} />
        )}
      </FormModal>
    </div>
  );
};

export default StarterPage;

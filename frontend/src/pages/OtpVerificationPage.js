import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import useHttpRequest from "../hooks/useHttpRequest";
import toast, { Toaster } from "react-hot-toast";
import { setIsLoading, setUserData } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "@mui/material";

const OtpVerificationPage = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [seconds, setSeconds] = useState(120);
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const prevLocation = location.state?.from;

  //getting previous location. and if it not comming from the /sign-up should run the resend otp

  useEffect(() => {
    if (user) {
      if (!user.token || user.isEmailVerified) {
        navigate("/", { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    // Prevent user from going back
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handlePopState = () => {
    window.history.pushState(null, null, window.location.href);
  };

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  useEffect(() => {
    if (prevLocation === "/" && !user.isEmailVerified) {
      resendOtp();
    }
  }, [prevLocation]);

  const resendOtp = async () => {
    try {
      const data = await sendRequest("POST", `users/resend-link/${user.id}`);

      dispatch(setUserData(data.user, data.token));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {}
    setOtp("");
    setSeconds(120);
  };

  const handleOnChange = (value) => {
    setOtp(value);
  };

  const handleOnComplete = async (value) => {
    dispatch(setIsLoading(true));
    try {
      const result = await sendRequest(
        "POST",
        `users/verify/${user.id}/${value}`
      );

      if (result.success) {
        const user = result.user;
        const token = result.token;

        dispatch(setUserData({ user, token }));

        setTimeout(() => {
          window.location.replace("/");
        }, 3000); // Adjust timeout as necessary
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateChar = (value) => {
    return /^\d+$/.test(value); // Check if value is a number
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <p className="mb-4">Enter the OTP code that was sent to your email</p>
        <MuiOtpInput
          length={6}
          gap={2}
          autoFocus
          value={otp}
          onChange={handleOnChange}
          onComplete={handleOnComplete}
          validateChar={validateChar}
          className=" flex justify-center gap-2 mb-4"
        />
        <p className="mb-4">
          OTP expires in: {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
        </p>
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-300"
          onClick={resendOtp}
          disabled={seconds > 0}
        >
          Resend OTP
        </Button>
      </div>
      {isLoading && <LoadingSpinner />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default OtpVerificationPage;

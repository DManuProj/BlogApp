import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import useHttpRequest from "../hooks/useHttpRequest";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const OtpVerification = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  // const otpData = JSON.parse(localStorage.getItem("otp_data"));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, otpData } = useSelector((state) => state.user);

  // console.log("user", user);

  const [seconds, setSeconds] = useState(10);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  const resendOtp = async () => {
    // Logic to resend OTP
    try {
      const data = await sendRequest("POST", `users/resend-link/${user.id}`);
      console.log("dataOnResend ", data);

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        })
      );

      dispatch(signIn(data.user, data.token));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {}
    setOtp("");
    setSeconds(120);
  };

  const handleOnChange = (value) => {
    console.log(value);
    setOtp(value);
  };

  const handleOnComplete = async (value) => {
    try {
      const data = await sendRequest(
        "POST",
        `users/verify/${user.id}/${value}`
      );

      // const userData = data.user;
      // const token = user.token;
      console.log("dataOnComplete ", data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user._id,
          isEmailVerified: data.user.emailVerified,
          token: user.token,
        })
      );
      // dispatch(signIn({ userData, token }));

      setTimeout(() => {
        console.log("Navigating to /auth");
        localStorage.removeItem("otp_data");
        // navigate("/auth", { replace: true });
        window.location.replace("/auth");
      }, 3000); // Adjust timeout as necessary
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  const validateChar = (value) => {
    return /^\d+$/.test(value); // Check if value is a number
  };
  // if (!otpData.otpLevel) navigate("/auth");
  // if (user.emailVerified) navigate("/dashboard");

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
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-300"
          onClick={resendOtp}
          disabled={seconds > 0}
        >
          Resend OTP
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default OtpVerification;

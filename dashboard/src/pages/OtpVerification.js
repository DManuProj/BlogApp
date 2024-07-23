import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import useHttpRequest from "../hooks/useHttpRequest";
import toast, { Toaster } from "react-hot-toast";
import { setUserData } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const OtpVerification = () => {
  const { isLoading, sendRequest } = useHttpRequest();

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const prevLocation = location.state?.from;

  const { user } = useSelector((state) => state.user);

  const [seconds, setSeconds] = useState(120);
  const [otp, setOtp] = useState("");

  //check if its from the dashboard/setting page
  if (!user.isEmailVerified) {
    var fromSetting = prevLocation.pathname;
    var fromDashboard = prevLocation.startsWith("/dashboard");
  }

  useEffect(() => {
    console.log("runs on here", prevLocation);
    if (
      prevLocation &&
      (fromSetting || fromDashboard) &&
      !user.isEmailVerified
    ) {
      resendOtp();
    }
  }, [prevLocation]);

  useEffect(() => {
    if (user) {
      if (!user.token || user.isEmailVerified) {
        navigate("/", { replace: true });
      }
    }
  }, []);

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

      dispatch(setUserData(data.user, data.token));
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
      const result = await sendRequest(
        "POST",
        `users/verify/${user.id}/${value}`
      );

      const token = user.token;

      dispatch(setUserData({ user: result.user, token }));

      setTimeout(() => {
        console.log("Navigating to /auth");
        localStorage.removeItem("otp_data");
        navigate("/", { replace: true });
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
      <Toaster position="bottom-right" />
    </div>
  );
};

export default OtpVerification;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isOTPLevel: false,
  isLoading: false,
  signInModalOpen: false,
  otpData: JSON.parse(localStorage.getItem("otp_data")) || null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    signIn: (state, action) => {
      console.log("in the store", action.payload);
      const userData = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        token: action.payload.token,
        isEmailVerified: action.payload.user.emailVerified,
        account: action.payload.user.accountType,
        image: action.payload.user.image,
      };
      state.user = userData;

      localStorage.setItem("user", JSON.stringify(userData));
    },
    signInModal: (state, action) => {
      state.signInModalOpen = action.payload;
    },
    signOut: (state) => {
      state.user = { id: null, token: null };
      state.isLoading = true;
      localStorage.removeItem("user");
    },
    setOTPData: (state, action) => {
      state.otpData = action.payload;
      localStorage.setItem("otp_data", JSON.stringify(action.payload));
    },
  },
});

export const { signIn, setPT, signOut, setOTPData, signInModal } =
  userSlice.actions;
export default userSlice.reducer;

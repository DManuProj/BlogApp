import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  signInModalOpen: false,
  isDarkMode:
    localStorage.getItem("isDarkMode") !== undefined
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false, // light mode is the default
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const tokenExpirationTime = new Date(
        new Date().getTime() + 2 * 60 * 60 * 1000
      );
      const userData = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        token: action.payload.token,
        isEmailVerified: action.payload.user.emailVerified,
        image: action.payload.user.image,
        expiresIn: tokenExpirationTime,
      };

      state.user = userData;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          expiresIn: tokenExpirationTime.toISOString(),
        })
      );
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", state.isDarkMode);
    },
  },
});

export const { signOut, signInModal, toggleMode, setIsLoading, setUserData } =
  userSlice.actions;
export default userSlice.reducer;

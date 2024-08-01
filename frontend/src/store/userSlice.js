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
      ).toISOString(); // Store as ISO string

      const userData = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        token: action.payload.token,
        isEmailVerified: action.payload.user.emailVerified,
        image: action.payload.user.image,
        accountType: action.payload.user.accountType,
        expiresIn: tokenExpirationTime,
      };

      state.user = userData;

      localStorage.setItem("user", JSON.stringify(userData));
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
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { signOut, toggleMode, setIsLoading, setUserData } =
  userSlice.actions;
export default userSlice.reducer;

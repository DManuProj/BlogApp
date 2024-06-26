import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  signInModalOpen: false,
  isDarkMode:
    localStorage.getItem("isDarkMode") !== undefined
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false, //light mode is the default
  drawerOpen: false,
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
    updateUser: (state, action) => {
      console.log("in the store", action.payload);
      const userData = {
        id: action.payload.updatedUser._id,
        name: action.payload.updatedUser.name,
        token: action.payload.token,
        isEmailVerified: action.payload.updatedUser.emailVerified,
        account: action.payload.updatedUser.accountType,
        image: action.payload.updatedUser.image,
      };
      state.user = userData;

      localStorage.setItem("user", JSON.stringify(userData));
    },
    signInModal: (state, action) => {
      state.signInModalOpen = action.payload;
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    signOut: (state) => {
      state.user = { id: null, token: null };
      state.isLoading = true;
      localStorage.removeItem("user");
    },
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", state.isDarkMode);
    },
  },
});

export const {
  signIn,
  setPT,
  signOut,
  signInModal,
  setDrawerOpen,
  updateUser,
  toggleMode,
} = userSlice.actions;
export default userSlice.reducer;

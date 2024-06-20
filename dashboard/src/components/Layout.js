import React, { useState } from "react";
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import logo from "../assets/Logo.png";
import { Link, Navigate, useLocation } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signInModal, signOut } from "../store/userSlice";
import { IoMdMenu } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";
// import LoginForm from "./form/LoginForm";

// const MobileDrawer = () => {
// <IoMdMenu />;
// }

const UserMenu = ({ user, theme }) => {
  // const { user, isOTPLevel, signInModal } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    setTimeout(() => {
      localStorage.removeItem("user");
      window.location.replace("/auth");
    }, 3000);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const firstName = user.name.trim().split(/\s+/)[0];
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
        className="w-32 font-Poppins"
      >
        <IconButton
          disableRipple
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {user.image ? (
            <Avatar className="size-11" src={user.image} />
          ) : (
            <Avatar className="size-11">{initials}</Avatar>
          )}
        </IconButton>
        <div className="mx-2 text-sm">
          <p className="font-semibold">{firstName}</p>
          <p className="text-xs">{user.account}</p>
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon></ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const Layout = ({ children }) => {
  const { user, isOTPLevel, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  console.log("user in layout", user);
  const location = useLocation();
  {
    /* {user.token ? (
          <AdminDashboard />
        ) : (
          <Navigate to="/auth" state={{ from: location }} replace />
        )} */
  }

  const handleLogin = () => {
    dispatch(signInModal(true));
  };
  return (
    <div className="font-sans ">
      <div
        style={{ overflow: "hidden " }}
        className=" border border-gray-200 border-solid flex justify-between items-center h-20 w-full px-8  py-2  "
      >
        <div className="cursor-pointer   flex gap-3 content-center items-center size-5 ">
          <img src={fb} alt="fb" />
          <img src={insta} alt="fb" />
          <img src={twitter} alt="fb" />
        </div>
        <div className="cursor-pointer w-auto">
          <img className=" w-32 h-10" src={logo} alt="logo" />
        </div>
        <div className="flex gap-14 items-center">
          <div className="flex gap-2 items-center">
            {user?.token ? (
              <UserMenu user={user} />
            ) : (
              <Link
                // to="login"
                onClick={handleLogin}
                className="flex items-center gap-2 rounded-full 2XL:mr-10 text-base"
              >
                <span>Login</span>
                <MdArrowForward />
              </Link>
            )}
            {/* <UserMenu user={user?.user} /> */}
          </div>
        </div>
      </div>
      <div>{children}</div>
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Layout;

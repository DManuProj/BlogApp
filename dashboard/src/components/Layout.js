import React, { useEffect, useState } from "react";
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import logo from "../assets/Logo.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import { BsFillMoonStarsFill } from "react-icons/bs";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import {
  setDrawerOpen,
  signInModal,
  signOut,
  toggleMode,
} from "../store/userSlice";
import { IoMdMenu } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";

import { IoMdSunny } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
// import LoginForm from "./form/LoginForm";

// const MobileDrawer = () => {
// <IoMdMenu />;
// }

const UserMenu = ({ user, theme }) => {
  // const { user, isOTPLevel, signInModal } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setTimeout(() => {
      dispatch(signOut());
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

  const navigateToSettings = () => {
    navigate("/dashboard/settings");
    handleClose(); // Close menu after navigation
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
            <Avatar className=" size-9 xs:size-11" src={user.image} />
          ) : (
            <Avatar className="size-11">{initials}</Avatar>
          )}
        </IconButton>
        <div className="mx-2 text-sm dark:text-white">
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
        <MenuItem onClick={navigateToSettings}>
          <ListItemIcon>
            <LuSettings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <CiLogout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const Layout = ({ children }) => {
  const { user, isOTPLevel, isLoading, drawerOpen, isDarkMode } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleModeHandler = () => {
    dispatch(toggleMode());
  };
  const isMdScreen = useMediaQuery("(max-width:768px)");
  const isSmScreen = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

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
  const handleOpenDrawer = () => {
    dispatch(setDrawerOpen(true));
    console.log("click menu icon");
  };

  return (
    <div className="dark:bg-slate-800 bg-white">
      <div
        style={{ overflow: "hidden " }}
        className=" border-b dark:border-gray-500 border-gray-200 border-solid flex justify-between items-center h-20 w-full px-8  py-2  "
      >
        <div
          style={{
            display: `${
              location.pathname !== "/auth" && isMdScreen ? "none" : "flex"
            }`,
          }}
          className=" cursor-pointer gap-3 content-center items-center size-5"
        >
          <img src={fb} alt="fb" style={{ height: "20px", width: "20px" }} />
          <img
            src={insta}
            alt="insta"
            style={{ height: "20px", width: "20px" }}
          />
          <img
            src={twitter}
            alt="twitter"
            className="dark:bg-white rounded-full"
            style={{ height: "20px", width: "20px" }}
          />
        </div>

        {location.pathname !== "/auth" && isMdScreen && (
          <IoMdMenu
            className=" size-8 cursor-pointer"
            onClick={handleOpenDrawer}
          />
        )}

        <div style={{}} className=" hidden md:flex cursor-pointer w-auto">
          <img className=" w-32 h-10" src={logo} alt="logo" />
        </div>

        <div className="flex gap-14 items-center">
          <div className="flex gap-2 items-center   ">
            {location.pathname === "/auth" && (
              <IconButton onClick={toggleModeHandler}>
                {isDarkMode ? (
                  <IoMdSunny className="h-full size-6 dark:text-white font-bold" />
                ) : (
                  <BsFillMoonStarsFill className="size-5 font-bold text-black dark:text-white" />
                )}
              </IconButton>
            )}

            {user?.token ? (
              <UserMenu user={user} />
            ) : (
              <Link
                // to="login"
                onClick={handleLogin}
                className="flex items-center gap-2 dark:text-white rounded-full 2XL:mr-10 text-base"
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

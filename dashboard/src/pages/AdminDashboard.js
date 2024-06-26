import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AiFillDashboard } from "react-icons/ai";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { MdContentPasteSearch } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen, toggleMode } from "../store/userSlice";
import { IconButton, Toolbar } from "@mui/material";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import fb from "../assets/fb.png";
import { IoMdClose, IoMdSunny } from "react-icons/io";
import { GoSun } from "react-icons/go";
import { BsFillMoonStarsFill } from "react-icons/bs";
const AdminDashboard = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [isClosing, setIsClosing] = React.useState(false);
  const { user, drawerOpen, isDarkMode } = useSelector((state) => state.user);

  if (!user) {
    navigate("/auth");
  }

  const handleDrawerClose = () => {
    dispatch(setDrawerOpen(false));
  };
  const sidebarItems = [
    {
      itemText: "Dashboard",
      icon: <AiFillDashboard size={20} />,
      path: "home",
    },
    {
      itemText: "Analytics",
      icon: <TbDeviceDesktopAnalytics size={20} />,
      path: "analytics",
    },
    {
      itemText: "Content",
      icon: <MdContentPasteSearch size={20} />,
      path: "content",
    },
    {
      itemText: "Followers",
      icon: <RxPerson size={20} />,
      path: "followers",
    },
    {
      itemText: "Create Post",
      icon: <IoCreateOutline size={20} />,
      path: "create-post",
    },
    {
      itemText: "Setting",
      icon: <LuSettings size={20} />,
      path: "settings",
    },
  ];

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };
  const toggleModeHandler = () => {
    dispatch(toggleMode());
  };

  return (
    <div id="dashboard" className="flex h-full  ">
      <div className="md:flex hidden">
        <Drawer
          onClose={handleDrawerClose}
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            overflow: "hidden",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              position: "relative",
              boxSizing: "border-box",
              borderColor: `${isDarkMode && "#444d5d"}`,
              zIndex: "1",
              backgroundColor: `${isDarkMode ? "#1e293b" : "white"}`,
            },
            "& .MuiListItemButton-root": {
              // Apply width to the ListItemButton
              // or any specific value you prefer
              justifyContent: "center ",
            },
          }}
          variant="permanent"
          anchor="left"
          className="hidden md:block "
        >
          <List className="overflow-hidden ">
            {sidebarItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton
                  disableRipple
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index, item.path)}
                  className={`${
                    selectedIndex === index
                      ? ` dark:bg-white dark:text-zinc-900 bg-gray-800 text-white`
                      : " dark:text-white text-gray-900-700"
                  }  font-Poppins rounded-full px-1.5`}
                >
                  <ListItemIcon
                    className={`${
                      selectedIndex === index
                        ? "dark:bg-white dark:text-zinc-900 bg-inherit text-white"
                        : " dark:text-white text-gray-900-700"
                    } mx-8 `}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {/* <Link to={item.path}> */}
                  <ListItemText
                    className="font-Poppins -mx-12"
                    primary={item.itemText}
                  />
                  {/* </Link> */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className=" h-20 flex w-full justify-center cursor-pointer">
            <IconButton onClick={toggleModeHandler}>
              {isDarkMode ? (
                <IoMdSunny className="h-full size-6 dark:text-white font-bold" />
              ) : (
                <BsFillMoonStarsFill className="size-5 font-bold text-black dark:text-white" />
              )}
            </IconButton>
          </div>
        </Drawer>

        <div>
          <Divider />
          <Drawer
            onClose={handleDrawerClose}
            open={drawerOpen}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              overflow: "hidden",
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                position: "relative",
                boxSizing: "border-box",
                zIndex: 1,
              },
              "& .MuiListItemButton-root": {
                justifyContent: "center",
              },
            }}
            variant="temporary"
            anchor="left"
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <img
                  src={fb}
                  alt="fb"
                  style={{ height: "20px", width: "20px" }}
                />
                <img
                  src={insta}
                  alt="insta"
                  style={{ height: "20px", width: "20px" }}
                />
                <img
                  src={twitter}
                  alt="twitter"
                  style={{ height: "20px", width: "20px" }}
                />
              </div>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleDrawerClose}
              >
                <IoMdClose />
              </IconButton>
            </Toolbar>
            <List sx={{ overflow: "hidden" }}>
              {sidebarItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    disableRipple
                    selected={selectedIndex === index}
                    className={`${
                      selectedIndex === index
                        ? "bg-gray-800 text-white"
                        : "text-gray-900-700"
                    } font-Poppins rounded-full px-1.5`}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#282C35",
                        borderRadius: "50px",
                        // height: "2.5rem",

                        "&:hover": {
                          backgroundColor: "#282C35", // Keep the background color on hover
                        },

                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }}
                    onClick={() => handleListItemClick(index, item.path)}
                  >
                    <ListItemIcon
                      className={`${
                        selectedIndex === index
                          ? "bg-inherit text-white"
                          : "text-gray-900-700"
                      } mx-8 `}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="font-Poppins -mx-12"
                      primary={item.itemText}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
        </div>
      </div>
      <div className="w-full  px-6 py-4 h-svh overflow-auto  ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

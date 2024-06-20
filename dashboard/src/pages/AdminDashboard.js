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
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();

  const { user, isOTPLevel, signInModalOpen } = useSelector(
    (state) => state.user
  );
  console.log(user);
  if (!user) {
    navigate("/auth");
  }
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <div id="dashboard" className="flex h-full ">
      <div className="flex  ">
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            overflow: "hidden",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              position: "relative",
              boxSizing: "border-box",
              zIndex: "1",
            },
            "& .MuiListItemButton-root": {
              // Apply width to the ListItemButton
              // or any specific value you prefer
              justifyContent: "center ",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List className="overflow-hidden">
            {sidebarItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton
                  disableRipple
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index, item.path)}
                  className={`${
                    selectedIndex === index
                      ? "bg-gray-800 text-white"
                      : "text-gray-900-700"
                  } font-Poppins rounded-full px-1.5`}
                  // onClick={() => handleListItemClick(index, item.path)}
                  // sx={{
                  //   "&.Mui-selected": {
                  //     backgroundColor: "#282C35",
                  //     borderRadius: "50px",
                  //     // height: "2.5rem",

                  //     "&:hover": {
                  //       backgroundColor: "#282C35", // Keep the background color on hover
                  //     },

                  //     color: "white",
                  //     "& .MuiListItemIcon-root": {
                  //       color: "white",
                  //     },
                  //   },
                  // }}
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
        </Drawer>
      </div>
      <div className="w-full  px-6 py-4 h-svh overflow-auto  ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { AiOutlineEye, AiOutlineSetting } from "react-icons/ai";
import { MdMessage, MdOutlineDeleteOutline } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { updateURL } from "../util/index";
import moment from "moment";
import clsx from "clsx";
import useHttpRequest from "../hooks/useHttpRequest";
import LoadingSpinner from "../components/LoadingSpinner";
import { Toaster } from "react-hot-toast";

const Content = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.user);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [open, setOpen] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  // const [isPending, setIsPending] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);
  const { isLoading, sendRequest } = useHttpRequest();

  const fetchContent = async () => {
    updateURL({ page, navigate, location });

    try {
      const data = await sendRequest(
        "POST",
        `posts/admin-content?page=${page}`,
        null,
        {
          Authorization: `Bearer ${user.token}`,
        }
      );
      console.log("analytics data", data);
      setContentData(data.data);
      setTotalPosts(data.data.length);
    } catch (error) {
      console.log(error);
    }

    //  setContentData(exampleData);
    //  setTotalPosts(exampleData.length);
  };

  const handleComment = (id, size) => {
    if (size > 0) {
      // Handle comment open
    }
  };

  const handlePerformAction = (val, id, status) => {
    setSelected(id);
    setType(val);
    setStatus(status);
    setOpen(true);
  };
  console.log("selected", selected);
  console.log("type", type);
  console.log("status", status);
  const handleActions = async () => {
    switch (type) {
      case "delete":
        // Perform delete actionc
        await sendRequest("DELETE", `posts/${selected}`, null, {
          Authorization: `Bearer ${user.token}`,
        });
        break;
      case "status":
        // Perform status update action
        sendRequest(
          "PATCH",
          `posts/update/${selected}`,
          { status: status },
          {
            Authorization: `Bearer ${user.token}`,
          }
        );
        break;
      default:
        return;
    }
    fetchContent();
    setOpen(false);
  };

  const openMenu = Boolean(actionMenu);
  const handleClick = (event) => {
    setActionMenu(event.currentTarget);
  };
  const handleClose = () => {
    setActionMenu(null);
  };
  useEffect(() => {
    fetchContent();
  }, [page]);

  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-lg pb-1 font-semibold">
        Contents (
        <span>
          {contentData.length * page + " of " + totalPosts + " records"}
        </span>
        )
      </p>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="cursor-pointer">
              <TableCell className="text-base ">Post Title</TableCell>
              <TableCell className="text-base">Category</TableCell>
              <TableCell className="text-base" align="center">
                Views
              </TableCell>
              <TableCell className="text-base" align="center">
                Comments
              </TableCell>
              <TableCell className="text-base" align="center">
                Post Date
              </TableCell>
              <TableCell className="text-base" align="center">
                Status
              </TableCell>
              <TableCell className="text-base" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentData.length > 0 &&
              contentData.map((el) => (
                <TableRow key={el._id} className="to-gray-400">
                  <TableCell className="flex gap-2 items-center">
                    <img
                      src={el.img}
                      alt={el.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{el.title}</p>
                  </TableCell>
                  <TableCell>{el.category}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <AiOutlineEye />
                    </IconButton>
                    {el.views.length ? el.views : 0}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <MdMessage />
                    </IconButton>
                    {el.comments.length ? el.comments : 0}
                  </TableCell>
                  <TableCell align="center">
                    {moment(el.createdAt).fromNow()}
                  </TableCell>
                  <TableCell align="center" className=" ">
                    <span
                      className={clsx(
                        el.status ? "bg-green-700" : "bg-red-700",
                        "text-white rounded-full font-semibold px-4 py-1.5 cursor-pointer "
                      )}
                    >
                      {el.status ? "Active" : "Disabled"}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={handleClick}>
                      <BiDotsVerticalRounded />
                    </IconButton>
                    <Menu
                      anchorEl={actionMenu}
                      open={openMenu}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() =>
                          handlePerformAction("status", el._id, !el.status)
                        }
                      >
                        <ListItemIcon>
                          <AiOutlineSetting size={21} />
                        </ListItemIcon>

                        {el.status ? "Disable" : "Enable"}
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "#C80036",
                        }}
                        onClick={() => handlePerformAction("delete", el._id)}
                      >
                        <ListItemIcon
                          sx={{
                            color: "#C80036",
                          }}
                          className="bg-slate-700"
                        >
                          <MdOutlineDeleteOutline size={21} />
                        </ListItemIcon>
                        <span sx={{ fontSize: "5rem " }} className="text-2xl">
                          Delete Post
                        </span>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="w-full mt-5 flex items-center justify-center">
        <Pagination
          count={totalPosts}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to perform this action?
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "GrayText",
              borderRadius: "2rem",
              color: "white",

              "&:hover": {
                backgroundColor: "darkgrey",
              },
            }}
            className=" bg-slate-900 text-lg"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#1F2937",
              borderRadius: "2rem",
              color: "white",

              "&:hover": {
                backgroundColor: "#C80036",
              },
            }}
            variant="contained"
            onClick={handleActions}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <LoadingSpinner />}

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Content;

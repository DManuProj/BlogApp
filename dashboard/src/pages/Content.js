import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Typography,
} from "@mui/material";
import { AiOutlineEye, AiOutlineSetting } from "react-icons/ai";
import { MdMessage, MdOutlineDeleteOutline } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { updateURL } from "../util/index";
import moment from "moment";
import clsx from "clsx";
import useHttpRequest from "../hooks/useHttpRequest";
import LoadingSpinner from "../components/LoadingSpinner";
import { setOpenComments, setCommentId } from "../store/commentsSlice";
import { Toaster } from "react-hot-toast";
import Comments from "../components/Comments";
import { setContentData } from "../store/contentSlices";

const Content = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isDarkMode } = useSelector((state) => state.user);
  const { openComment } = useSelector((state) => state.comments);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [open, setOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);
  const { isLoading, sendRequest } = useHttpRequest();

  const dispatch = useDispatch();
  const { contentData, numOfPages, totalPosts } = useSelector(
    (state) => state.contents
  );

  const fetchContent = async () => {
    updateURL({ page, navigate, location });

    try {
      const result = await sendRequest(
        "POST",
        `posts/admin-content?page=${page}`,
        null,
        {
          Authorization: `Bearer ${user.token}`,
        }
      );

      dispatch(setContentData(result));
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (id, size) => {
    if (size > 0) {
      dispatch(setCommentId({ id }));
      dispatch(setOpenComments(true));
    }
  };

  const handlePerformAction = (val, id, status) => {
    setSelected(id);
    setType(val);
    setStatus(status);
    setOpen(true);
  };

  const handleActions = async () => {
    switch (type) {
      case "delete":
        // Perform delete action
        await sendRequest("DELETE", `posts/${selected}`, {
          Authorization: `Bearer ${user.token}`,
        });
        break;
      case "status":
        // Perform status update action
        await sendRequest(
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
    handleClose();
  };

  const openMenu = Boolean(actionMenu);
  const handleClick = (event, id) => {
    setActionMenu({ anchor: event.currentTarget, id });
  };

  const handleClose = () => {
    setActionMenu(null);
  };

  useEffect(() => {
    if (user.isEmailVerified) {
      fetchContent();
    }
  }, [page]);

  return (
    <div className="w-full h-full flex flex-col">
      <Typography className="text-lg pb-1 dark:text-white font-semibold">
        Contents (
        <span>
          {contentData.length * page + " of " + totalPosts + " records"}
        </span>
        )
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="cursor-pointer  ">
              <TableCell className="text-base dark:text-white">
                Post Title
              </TableCell>
              <TableCell className="text-base dark:text-white">
                Category
              </TableCell>
              <TableCell className="text-base dark:text-white" align="center">
                Views
              </TableCell>
              <TableCell className="text-base dark:text-white" align="center">
                Comments
              </TableCell>
              <TableCell className="text-base dark:text-white" align="center">
                Post Date
              </TableCell>
              <TableCell className="text-base dark:text-white" align="center">
                Status
              </TableCell>
              <TableCell className="text-base dark:text-white" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentData.length > 0 &&
              contentData.map((el) => (
                <TableRow key={el._id} className="to-gray-400 ">
                  <TableCell className="flex gap-4 items-center dark:text-white">
                    <img
                      src={el.img}
                      alt={el.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{el.title}</p>
                  </TableCell>
                  <TableCell className="dark:text-pink-700 dark:font-bold">
                    {el.category}
                  </TableCell>
                  <TableCell className="dark:text-white " align="center">
                    <IconButton>
                      <AiOutlineEye className="dark:text-white " />
                    </IconButton>
                    {el.views.length ? el.views.length : 0}
                  </TableCell>
                  <TableCell className="dark:text-white " align="center">
                    <IconButton
                      onClick={() =>
                        handleComment(el?._id, el?.comments?.length)
                      }
                    >
                      <MdMessage className="dark:text-white " />
                    </IconButton>
                    {el.comments.length ? el.comments.length : 0}
                  </TableCell>
                  <TableCell className="dark:text-white " align="center">
                    {moment(el.createdAt).fromNow()}
                  </TableCell>
                  <TableCell align="center" className="dark:text-white ">
                    <span
                      className={clsx(
                        el.status ? "bg-green-700" : "bg-red-700",
                        "text-white rounded-full font-semibold px-4 py-1.5 cursor-pointer "
                      )}
                    >
                      {el.status ? "Active" : "Disabled"}
                    </span>
                  </TableCell>
                  <TableCell className="dark:text-white " align="center">
                    <IconButton onClick={(event) => handleClick(event, el._id)}>
                      <BiDotsVerticalRounded className="dark:text-white " />
                    </IconButton>
                    <Menu
                      anchorEl={actionMenu?.anchor}
                      open={openMenu && actionMenu?.id === el._id}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() =>
                          handlePerformAction("status", el._id, !el.status)
                        }
                      >
                        <ListItemIcon className="dark:text-white ">
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
          count={numOfPages}
          onChange={(e, value) => setPage(value)}
          size="large"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: `${isDarkMode ? "white" : ""}`,
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: `${isDarkMode ? "white" : "#1f2937"}`,
              color: `${isDarkMode ? "black" : "primary"}`,
              borderRadius: "50%",
            },
          }}
        />
      </div>

      <Dialog
        className="dark:bg-slate-700"
        open={open}
        onClose={() => setOpen(false)}
      >
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

      {openComment && <Comments />}
      {isLoading && <LoadingSpinner />}

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Content;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import {
  Avatar,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useHttpRequest from "../hooks/useHttpRequest";
import { formatNumber, getInitials, updateURL } from "../util";
import moment from "moment";

const Followers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [followers, setFollowers] = useState([]);
  const { isLoading, sendRequest, error } = useHttpRequest();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersData = await sendRequest(
          "POST",
          `posts/admin-followers?page=${page}`,
          null,
          {
            Authorization: `Bearer ${user.token}`,
          }
        );
        if (followersData) {
          toast.success("Data Loaded Successfully");
          setFollowers(followersData);
        }
      } catch (err) {
        console.log(err);
        const errMsg = error?.response?.data?.message;
        toast.error(errMsg ?? error.message);
        if (errMsg === "Authentication failed") {
          localStorage.removeItem("user");
        }
      }
    };

    fetchFollowers();
    updateURL({ page, navigate, location });
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value });
  };

  return (
    <div className="w-full flex flex-col ">
      <Typography
        variant="h6"
        className="text-slate-700 dark:text-white font-semibold"
        gutterBottom
      >
        Followers (
        <span className="text-sm">
          {followers.data?.length * followers.page +
            " of " +
            followers.total +
            " records"}
        </span>
        )
      </Typography>

      <TableContainer className="flex-1">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="dark:text-white">Name</TableCell>
              <TableCell className="dark:text-white">Account</TableCell>
              <TableCell className="dark:text-white">Followers</TableCell>
              <TableCell className="dark:text-white">Joined Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {followers.data?.map(({ _id, followerId, createdAt }) => (
              <TableRow key={_id} className="text-slate-600 dark:text-white ">
                <TableCell className="flex gap-2 items-center">
                  {followerId.image ? (
                    <Avatar
                      src={followerId.image}
                      alt={followerId.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar className="w-10 h-10 rounded-full bg-indigo-700 text-white">
                      {getInitials(followerId.name)}
                    </Avatar>
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    className={`${
                      followerId?.accountType === "User"
                        ? "bg-rose-800 text-rose-800"
                        : "bg-blue-800 text-blue-800"
                    } bg-opacity-30 dark:text-white font-semibold px-4 py-1 rounded-full w-fit`}
                  >
                    {followerId?.accountType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <div className="flex dark:text-white  gap-1 items-center">
                    {formatNumber(followerId?.followers.length ?? 0)}
                  </div>
                </TableCell>
                <TableCell>{moment(createdAt).fromNow()}</TableCell>
              </TableRow>
            ))}
            {followers.data?.length < 1 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  className="dark:text-white"
                >
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="w-full mt-5 flex items-center justify-center">
        <Pagination
          count={followers.numOfPages}
          page={parseInt(page, 10)}
          onChange={handlePageChange}
          siblingCount={1}
          defaultPage={followers.page}
          boundaryCount={1}
          color="primary"
          className="dark:bg-white"
        />
      </div>

      {isLoading && <LoadingSpinner />}

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Followers;

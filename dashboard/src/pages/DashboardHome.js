import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../hooks/useHttpRequest";
import Stats from "../components/Stats";
import Graph from "../components/Graph";
import {
  RecentFollowerTable,
  RecentPostTable,
} from "../components/RecentFollowerTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { setStatsData } from "../store/statsSlice";
import { Typography } from "@mui/material";

const DashboardHome = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const { user } = useSelector((state) => state.user);
  const statData = useSelector((state) => state.stats.statsData);

  const dispatch = useDispatch();

  const val = "28";

  useEffect(() => {
    if (user.isEmailVerified) {
      const fetchData = async () => {
        try {
          const data = await sendRequest(
            "POST",
            `posts/admin-analytics?query=${val}`,
            null,
            {
              Authorization: `Bearer ${user.token}`,
            }
          );

          dispatch(setStatsData(data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <div className="w-full   ">
      {/* should pass the data = data */}
      <Typography
        variant="h6"
        className="text-slate-700 dark:text-white font-semibold"
        gutterBottom
      >
        Dashboard Home
      </Typography>
      <Stats data={statData} />
      <div className="w-full py-8 dark:text-white ">
        <p className="mb-3">View Stats for last 28 days</p>
        {/** should pass data.viewStats */}
        {statData && <Graph data={statData.viewStats} />}
      </div>
      <div className="flex gap-6 flex-col md:flex-row py-6 dark:text-white  ">
        {/* recent followers */}

        <div className="w-full md:w-1/3 flex flex-col ">
          <span className="py-5 text-base font-medium">Recent Folloers</span>

          {statData && <RecentFollowerTable data={statData.last5Followers} />}
          {/* <RecentFollowerTable /> */}
        </div>

        {/* Top 5 contents */}
        <div className="w-full md:w-2/3 flex flex-col ">
          <span className="py-5 text-base font-medium">Recent 5 Content</span>

          {statData && <RecentPostTable data={statData.last5Posts} />}
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default DashboardHome;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../hooks/useHttpRequest";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Stats from "../components/Stats";
import Graph from "../components/Graph";
import LoadingSpinner from "../components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { setAnalyticsData } from "../store/analyticsSlice";

const Analytics = () => {
  const { user, isDarkMode } = useSelector((state) => state.user);
  const { isLoading, sendRequest } = useHttpRequest();
  const [numOfDays, setNumberOfDays] = useState(28);

  const statData = useSelector((state) => state.analytics.analyticsData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isEmailVerified) {
      const fetchData = async () => {
        try {
          const data = await sendRequest(
            "POST",
            `posts/admin-analytics?query=${numOfDays}`,
            null,
            {
              Authorization: `Bearer ${user.token}`,
            }
          );
          dispatch(setAnalyticsData(data));
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [numOfDays]);

  const handleChange = (event) => {
    const val = event.target.value;
    //  setSelectedRange(val);
    setNumberOfDays(val);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-3  dark:text-white">
        <p className="text-xl font-semibold ">Analytics</p>
        <FormControl
          size="medium"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: `${isDarkMode ? "white" : ""} `,
              },
            },
            "& .MuiSvgIcon-root": {
              color: `${isDarkMode ? "white" : ""} `,
            },
          }}
        >
          <Select
            className="dark:text-white"
            labelId="range-select-label"
            defaultValue={28}
            onChange={handleChange}
          >
            <MenuItem value={7}>7 days</MenuItem>
            <MenuItem value={28}>28 days</MenuItem>
            <MenuItem value={90}>90 days</MenuItem>
            <MenuItem value={365}>365 days</MenuItem>
          </Select>
        </FormControl>
      </div>
      {statData && <Stats data={statData} />}

      <div className="w-full py-8">
        <p className="py-5 text-base font-medium dark:text-white ">
          View Stats for last {numOfDays} days
        </p>
        {statData && <Graph data={statData.viewStats} />}
      </div>

      <div className="w-full mb-8 dark:text-white py-8">
        <p className="py-2 text-base font-medium dark:text-white ">
          Followers Stats for last {numOfDays} days
        </p>
        {statData && <Graph data={statData.followersStats} />}
      </div>

      {isLoading && <LoadingSpinner />}

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Analytics;

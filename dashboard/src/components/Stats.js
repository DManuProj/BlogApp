import React from "react";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { formatNumber } from "../util";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const icons = {
  user: FaPeopleGroup,
  view: MdOutlineRemoveRedEye,
  post: BsFillPostcardHeartFill,
  users: MdPeople,
};

const calculateDiff = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};

const Stats = ({ data }) => {
  const StatsData = [
    {
      title: "TOTAL POST",
      icon: "post",
      value: formatNumber(data?.totalPosts ?? 0),
      diff: calculateDiff(data?.totalPosts ?? 0, data?.previousTotalPosts ?? 0),
    },
    {
      title: "FOLLOWERS",
      icon: "users",
      value: formatNumber(data?.followers ?? 0),
      diff: calculateDiff(
        data?.followers ?? 0,
        data?.previousTotalFollowers ?? 0
      ),
    },
    {
      title: "TOTAL VIEWS",
      icon: "view",
      value: formatNumber(data?.totalViews ?? 0),
      diff: calculateDiff(data?.totalViews ?? 0, data?.previousTotalViews ?? 0),
    },
    {
      title: "TOTAL WRITERS",
      icon: "user",
      value: formatNumber(data?.totalWriters ?? 0),
      diff: calculateDiff(
        data?.totalWriters ?? 0,
        data?.previousTotalWriters ?? 0
      ),
    },
  ];

  const statsCard = StatsData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? GoArrowUpRight : GoArrowDownLeft;

    return (
      <Grid item xs={12} sm={6} md={3} key={stat.title}>
        <Paper
          elevation={3}
          className="p-2 h-full flex border border-white flex-col justify-between bg-slate-800 text-white"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" className="capitalize">
              {stat.title}
            </Typography>
            <Icon size="1.5rem" />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mt-2"
          >
            <Typography className="font-bold text-2xl">{stat.value}</Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              className="text-sm font-medium"
              color={stat.diff > 0 ? "teal" : "red"}
            >
              <span className="">{stat.diff}%</span>
              <DiffIcon />
            </Stack>
          </Stack>
          <Typography
            variant="caption"
            color="textSecondary"
            className=" text-white mt-2"
          >
            Compare to previous month
          </Typography>
        </Paper>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2} className="justify-center">
      {statsCard}
    </Grid>
  );
};

export default Stats;

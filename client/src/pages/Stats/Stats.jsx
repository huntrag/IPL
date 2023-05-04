import React from "react";
import { Stack } from "@mui/material";

import FilterTeam from "../../components/Filter/FilterStats";
import { TableStats } from "../../components";

const Stats = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={5}>
      <FilterTeam />
      <TableStats />
    </Stack>
  );
};

export default Stats;
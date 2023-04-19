import React from "react";
import Batting from "./Batting";
import Bowling from "./Bowling";

import { Stack } from "@mui/material";

const Innings = () => {
  return (
    <Stack direction="column" alignItems={"center"} spacing={2}>
      <Batting />
      <Bowling />
    </Stack>
  );
};

export default Innings;
